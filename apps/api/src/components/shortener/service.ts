import { JwtPayload } from 'jsonwebtoken';
import { ShortenedURL } from '@shared/models';
import { slugRepository } from '../slug/repository';
import { IShortenerRepository, shortenerRepository } from './repository';
import { AppError } from '@/middlewares/error';

interface ICreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
}

class ShortenerService {
  private repository: IShortenerRepository;

  constructor(injectedRepository?: IShortenerRepository) {
    this.repository = injectedRepository ?? shortenerRepository;
  }

  getShortenedUrl = async (slug: string) => {
    const result = await this.repository.getShortenedURL(slug);
    // TODO: add analytics here ig.
    if (!result) {
      throw new AppError(401, 'slug not found');
    }
    return result;
  };

  createShortenedUrl = async (payload: ICreateShortenedURLPayload) => {
    const slug = await slugRepository.findOneAndDelete();
    if (!slug) {
      // TODO: disaster scenario where no slugs are in pool must be added here.
      throw new AppError(500, 'slug pool is empty');
    }
    const { targetUrl, user } = payload;
    const shortenedUrl = await new ShortenedURL({
      slug,
      target_url: targetUrl,
      owner_id: user && user.sub,
    }).save();

    return shortenedUrl;
  };
}

export const shortenerService = new ShortenerService();
