import { IShortenedURL, ShortenedURL } from '@packages/shared/schemas';
import { CreateQueryPayload, GetQueryPayload } from '@/lib/shared';

class ShortenedUrlRepository {
  constructor() {}

  findOne = async ({ filter }: GetQueryPayload<IShortenedURL>) => {
    return ShortenedURL.findOne(filter).lean();
  };

  save = async ({ data, session }: CreateQueryPayload<IShortenedURL>) => {
    const shortenedUrl = new ShortenedURL(data);
    return shortenedUrl.save({ session });
  };
}

export const shortenedUrlRepository = new ShortenedUrlRepository();
