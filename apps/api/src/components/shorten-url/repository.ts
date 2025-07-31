import { IShortenedURL, ShortenedURL } from '@packages/shared/schemas';

export interface IShortenURLRepository {
  getShortenedURL: (slug: string) => Promise<IShortenedURL | null>;
  createShortenedURL: (data: IShortenedURL) => Promise<IShortenedURL>;
}

class ShortenUrlRepository implements IShortenURLRepository {
  constructor() {}

  getShortenedURL = async (slug: string) => ShortenedURL.findOne({ slug: slug }).lean();

  createShortenedURL = async (data: IShortenedURL) => {
    const resp = await new ShortenedURL(data).save();
    return resp;
  };
}

export const shortenerRepository = new ShortenUrlRepository();
