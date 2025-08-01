import { IShortenedURL, ShortenedURL } from '@packages/shared/schemas';
import { ICreateQueryPayload, IGetQueryPayload } from '@/lib/shared';

export interface IShortenedURLRepository {
  findOne: (payload: IGetQueryPayload<IShortenedURL>) => Promise<IShortenedURL | null>;
  save: (payload: ICreateQueryPayload<IShortenedURL>) => Promise<IShortenedURL>;
}

class ShortenedUrlRepository implements IShortenedURLRepository {
  constructor() {}

  findOne = async ({ filter }: IGetQueryPayload<IShortenedURL>) => {
    return ShortenedURL.findOne(filter).lean();
  };

  save = async ({ data, session }: ICreateQueryPayload<IShortenedURL>) => {
    const shortenedUrl = new ShortenedURL(data);
    return shortenedUrl.save({ session });
  };
}

export const shortenedUrlRepository = new ShortenedUrlRepository();
