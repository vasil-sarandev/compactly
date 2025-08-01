import {
  IPageViewTopicMessage,
  IWithId,
  IWithoutTimestamps,
  KAFKA_PAGEVIEW_TOPIC,
} from '@packages/shared/lib';
import { IPageView, IShortenedURL } from '@packages/shared/schemas';
import { Types } from 'mongoose';
import { shortenedUrlRepository } from '../../repository';
import { redisClient } from '@/lib/redis';
import { kafka } from '@/lib/kafka';
import { AppError } from '@/middlewares/error';

export type IGetShortenedUrlPayload = Omit<IWithoutTimestamps<IPageView>, 'shortenedUrlId'> & {
  slug: string;
};

const publishPageViewEvent = (message: IPageViewTopicMessage) => {
  // notifies analytics microservice for pageView event
  kafka.send({
    topic: KAFKA_PAGEVIEW_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export const getShortenedUrlCacheAside = async ({ slug, ...rest }: IGetShortenedUrlPayload) => {
  const cached = await redisClient.get(slug);

  if (cached) {
    const parsed: IWithId<IShortenedURL> = JSON.parse(cached);
    publishPageViewEvent({ ...rest, shortenedUrlId: new Types.ObjectId(parsed._id) });
    return parsed;
  }

  const shortenedUrl = await shortenedUrlRepository.findOne({ filter: { slug } });
  if (!shortenedUrl) {
    throw new AppError(404, 'slug not found');
  }
  publishPageViewEvent({ ...rest, shortenedUrlId: shortenedUrl._id });
  // set in cache with 1d expiration
  redisClient.set(slug, JSON.stringify(shortenedUrl), {
    expiration: { type: 'EX', value: 60 * 60 * 24 },
  });
  return shortenedUrl;
};
