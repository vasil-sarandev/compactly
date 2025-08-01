import { shortenedUrlRepository } from '../repository';
import { AppError } from '@/middlewares/error';

interface IGetShortenedUrlBySlugOperationPayload {
  slug: string;
}

export const getShortenedUrlBySlugOperation = async ({
  slug,
}: IGetShortenedUrlBySlugOperationPayload) => {
  const result = await shortenedUrlRepository.findOne({ filter: { slug } });
  // TODO: add analytics here ig.
  // TODO: redis caching
  if (!result) {
    throw new AppError(404, 'slug not found');
  }
  return result;
};
