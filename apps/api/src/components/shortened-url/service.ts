import { JwtPayload } from 'jsonwebtoken';
import { IPageView, SlugPoolType } from '@packages/shared/schemas';
import {
  IPageViewTopicMessage,
  ISlugPoolLowCountTopicMessage,
  IWithoutTimestamps,
  KAFKA_PAGEVIEW_TOPIC,
  KAFKA_SLUG_POOL_LOW_COUNT_TOPIC,
  SLUG_POOL_LOW_THRESHHOLD_COUNT,
} from '@packages/shared/lib';
import { slugPoolStatRepository } from '../slug-pool-stat/repository';
import { createShortenedUrlTransaction } from './helpers/create-shortenedUrl-transaction';
import { createShortenedUrlDisasterScenario } from './helpers/create-shortenedUrl-disaster';
import { shortenedUrlRepository } from './repository';
import { AppError } from '@/middlewares/error';
import { kafka } from '@/lib/kafka';

interface ICreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
  type: SlugPoolType;
}

type IGetShortenedUrlPayload = Omit<IWithoutTimestamps<IPageView>, 'shortenedUrlId'> & {
  slug: string;
};

class ShortenedURLService {
  constructor() {}

  getShortenedUrl = async ({ slug, ...rest }: IGetShortenedUrlPayload) => {
    const shortenedUrl = await shortenedUrlRepository.findOne({ filter: { slug } });
    if (!shortenedUrl) {
      throw new AppError(404, 'slug not found');
    }
    // notify analytics microservice for pageView event
    const message: IPageViewTopicMessage = { ...rest, shortenedUrlId: shortenedUrl._id };
    kafka.send({
      topic: KAFKA_PAGEVIEW_TOPIC,
      messages: [{ value: JSON.stringify(message) }],
    });
    return shortenedUrl;
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
