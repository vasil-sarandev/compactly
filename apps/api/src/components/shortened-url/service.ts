import { JwtPayload } from 'jsonwebtoken';
import { SlugPoolType } from '@packages/shared/schemas';
import {
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  SLUG_POOL_LOW_THRESHHOLD_COUNT,
} from '@packages/shared/lib';
import { slugPoolStatRepository } from '../slug-pool-stat/repository';
import { createShortenedUrlTransaction } from './helpers/create-shortenedUrl-transaction';
import { createShortenedUrlDisasterScenario } from './helpers/create-shortenedUrl-disaster';
import { getShortenedUrlBySlugOperation } from './helpers/get-shortenedUrl-by-slug';
import { AppError } from '@/middlewares/error';
import { kafka } from '@/lib/kafka';

interface ICreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
  type: SlugPoolType;
}

class ShortenedURLService {
  constructor() {}

  getShortenedUrl = async (slug: string) => {
    return getShortenedUrlBySlugOperation({ slug });
  };

  createShortenedUrl = async (payload: ICreateShortenedURLPayload) => {
    const { targetUrl, user, type } = payload;

    const slugPoolStats = await slugPoolStatRepository.findOne({ filter: { type } });
    if (!slugPoolStats) {
      throw new AppError(500, 'no pool stats available');
    }

    if (slugPoolStats.availableCount > 0) {
      // default scenario - run the transaction
      const resp = createShortenedUrlTransaction({ type, user, targetUrl });
      if (slugPoolStats.availableCount <= SLUG_POOL_LOW_THRESHHOLD_COUNT) {
        // notify pool manager microservice if low count of slugs are available.
        kafka.send({
          topic: KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
          messages: [{ value: JSON.stringify({ type }) }],
        });
      }
      return resp;
    } else {
      // no slugs available for some reason (worker failure most likely).
      // run the disaster scenario - generate a slug and make sure it doesn't exist.
      return createShortenedUrlDisasterScenario({ targetUrl });
    }
  };
}

export const shortenedURLService = new ShortenedURLService();
