import { JwtPayload } from 'jsonwebtoken';
import { SlugPoolStat, SlugPoolType } from '@packages/shared/schemas';
import {
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  SLUG_POOL_LOW_THRESHHOLD_COUNT,
} from '@packages/shared/lib';
import { IShortenURLRepository, shortenerRepository } from './repository';
import { createShortenedUrlTransaction } from './operations/create-shortenedUrl-transaction';
import { createShortenedUrlDisasterScenario } from './operations/create-shortenedUrl-disaster';
import { AppError } from '@/middlewares/error';
import { kafka } from '@/lib/kafka';

interface ICreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
  type: SlugPoolType;
}

class ShortenURLService {
  private repository: IShortenURLRepository;

  constructor(injectedRepository?: IShortenURLRepository) {
    this.repository = injectedRepository ?? shortenerRepository;
  }

  getShortenedUrl = async (slug: string) => {
    const result = await this.repository.getShortenedURL(slug);
    // TODO: add analytics here ig.
    if (!result) {
      throw new AppError(401, 'slug not found');
    }
    return result;
  };

  createShortenedUrl = async (payload: ICreateShortenedURLPayload) => {
    const { targetUrl, user, type = SlugPoolType.default } = payload;

    const defaultPoolStats = await SlugPoolStat.findOne({ type }).lean();
    if (!defaultPoolStats) {
      throw new AppError(500, 'no pool stats available');
    }

    if (defaultPoolStats.availableCount <= SLUG_POOL_LOW_THRESHHOLD_COUNT) {
      const msgValue = JSON.stringify({ type });
      kafka.send({
        topic: KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
        messages: [{ value: msgValue }],
      });
      console.log('low slug pool count detected. published a message to the topic');
    }

    if (defaultPoolStats.availableCount > 0) {
      // default scenario - run the transaction which picks up and deletes a slug from the pool and
      // decreases available count when creating a shortenedUrl
      const result = await createShortenedUrlTransaction({ type, user, targetUrl });
      return result;
    } else if (defaultPoolStats.availableCount === 0) {
      // disaster scenario - no slugs available for some reason (worker failure most likely).
      // generate a slug and make sure it doesn't exist.
      const result = await createShortenedUrlDisasterScenario({ targetUrl });
      return result;
    }
  };
}

export const shortenURLService = new ShortenURLService();
