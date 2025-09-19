import { IShortenedURL, ShortenedURL } from '@packages/shared/schemas';
import { GetQueryPayload } from '@/lib/shared';

class ShortenedUrlRepository {
  constructor() {}

  find = async ({ filter, options, session }: GetQueryPayload<IShortenedURL>) => {
    return ShortenedURL.find(filter, options, { session }).lean();
  };
}

export const shortenedUrlRepository = new ShortenedUrlRepository();
