import { JwtPayload } from 'jsonwebtoken';
import { SlugPoolType } from '@packages/shared/schemas';
import {
  SlugPoolLowCountTopicMessage,
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  SLUG_POOL_LOW_THRESHHOLD_COUNT,
} from '@packages/shared/lib';
import { slugPoolStatRepository } from '../slug-pool-stat/slug-pool-stat.repository';
import { createShortenedUrlTransaction } from './commands/shortened-url-create.command';
import { createShortenedUrlDisasterScenario } from './commands/shortened-url-create-disaster.command';
import {
  getShortenedUrlCacheAside,
  GetShortenedUrlPayload,
} from './commands/shortened-url-get-cache.command';
import { AppError } from '@/middlewares/error.middleware';
import { kafka } from '@/lib/kafka/kafka.index';

interface CreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
  type: SlugPoolType;
}

class ShortenedURLService {
  constructor() {}

  getShortenedUrl = async (payload: GetShortenedUrlPayload) => {
    return getShortenedUrlCacheAside(payload);
  };

  createShortenedUrl = async (payload: CreateShortenedURLPayload) => {
    const { targetUrl, user, type } = payload;

    const slugPoolStats = await slugPoolStatRepository.findOne({ filter: { type } });
    if (!slugPoolStats) {
      throw new AppError(500, 'no pool stats available');
    }

    // notify pool manager microservice if low count of slugs are available.
    if (slugPoolStats.availableCount <= SLUG_POOL_LOW_THRESHHOLD_COUNT) {
      const message: SlugPoolLowCountTopicMessage = { type };
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
