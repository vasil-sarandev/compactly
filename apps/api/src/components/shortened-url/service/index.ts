import { JwtPayload } from 'jsonwebtoken';
import { SlugPoolType } from '@packages/shared/schemas';
import {
  ISlugPoolLowCountTopicMessage,
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  SLUG_POOL_LOW_THRESHHOLD_COUNT,
} from '@packages/shared/lib';
import { slugPoolStatRepository } from '../../slug-pool-stat/repository';
import { createShortenedUrlTransaction } from './commands/create-shortenedUrl-transaction';
import { createShortenedUrlDisasterScenario } from './commands/create-shortenedUrl-disaster';
import {
  getShortenedUrlCacheAside,
  IGetShortenedUrlPayload,
} from './commands/get-shortenedUrl-cache-aside';
import { AppError } from '@/middlewares/error';
import { kafka } from '@/lib/kafka';

interface ICreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
  type: SlugPoolType;
}

class ShortenedURLService {
  constructor() {}

  getShortenedUrl = async (payload: IGetShortenedUrlPayload) => {
    return getShortenedUrlCacheAside(payload);
  };

  createShortenedUrl = async (payload: ICreateShortenedURLPayload) => {
    const { targetUrl, user, type } = payload;

    const slugPoolStats = await slugPoolStatRepository.findOne({ filter: { type } });
    if (!slugPoolStats) {
      throw new AppError(500, 'no pool stats available');
    }

    // notify pool manager microservice if low count of slugs are available.
    if (slugPoolStats.availableCount <= SLUG_POOL_LOW_THRESHHOLD_COUNT) {
      const message: ISlugPoolLowCountTopicMessage = { type };
      kafka.send({
        topic: KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
        messages: [{ value: JSON.stringify(message) }],
      });
    }
    if (slugPoolStats.availableCount > 0) {
      return createShortenedUrlTransaction({ type, user, targetUrl });
    }
    // no slugs available for some reason (worker failure most likely).
    // run the disaster scenario - generate a slug and make sure it doesn't exist.
    return createShortenedUrlDisasterScenario({ targetUrl });
  };
}

export const shortenedURLService = new ShortenedURLService();
