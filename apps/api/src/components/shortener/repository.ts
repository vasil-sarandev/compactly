import { IShortenedURL, ShortenedURL } from '@shared/models';

export interface IShortenerRepository {
  getShortenedURL: (slug: string) => Promise<IShortenedURL | null>;
  createShortenedURL: (data: IShortenedURL) => Promise<IShortenedURL>;
}

class ShortenerRepository implements IShortenerRepository {
  constructor() {}

  getShortenedURL = async (slug: string) => ShortenedURL.findOne({ slug: slug }).lean();

  createShortenedURL = async (data: IShortenedURL) => {
    const resp = await new ShortenedURL(data).save();
    return resp;
  };
}

export const shortenerRepository = new ShortenerRepository();
