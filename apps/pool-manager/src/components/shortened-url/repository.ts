import { IShortenedURL, ShortenedURL } from '@packages/shared/schemas';
import { IGetQueryPayload } from '@/lib/shared';

export interface IShortenedURLRepository {
  find: (payload: IGetQueryPayload<IShortenedURL>) => Promise<IShortenedURL[] | null>;
}

class ShortenedUrlRepository implements IShortenedURLRepository {
  constructor() {}

  find = async ({ filter, options, session }: IGetQueryPayload<IShortenedURL>) => {
    return ShortenedURL.find(filter, options, { session }).lean();
  };
}

export const shortenedUrlRepository = new ShortenedUrlRepository();
