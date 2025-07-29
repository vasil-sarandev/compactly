import { JwtPayload } from 'jsonwebtoken';
import { ShortenedURL, SlugPoolStat, SlugPoolType } from '@shared/models/schemas';
import { SLUG_POOL_LOW_THRESHHOLD_COUNT } from '@shared/util';
import { IShortenURLRepository, shortenerRepository } from './repository';
import { recursivelyFindAnAvailableSlug } from './helpers/find-available-slug';
import { AppError } from '@/middlewares/error';

interface ICreateShortenedURLPayload {
  user?: JwtPayload;
  targetUrl: string;
}

class ShortenURLService {
  private repository: IShortenURLRepository;

  constructor(injectedRepository?: IShortenURLRepository) {
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
    const { targetUrl, user } = payload;

    const defaultPoolStats = await SlugPoolStat.findOne({ type: SlugPoolType.default }).lean();
    if (!defaultPoolStats) {
      throw new AppError(500, 'no pool stats available');
    }
    if (defaultPoolStats.availableCount <= SLUG_POOL_LOW_THRESHHOLD_COUNT) {
      // send a message that the @api/pool-manager picks up and fills up the pool.
      // TODO: produce kafka message here.
    }

    let assignedSlug;
    if (defaultPoolStats.availableCount > 0) {
      // TODO: default scenario - pick a slug from the pool and decrease the count.
      assignedSlug = await recursivelyFindAnAvailableSlug();
    } else if (defaultPoolStats.availableCount === 0) {
      // disaster scenario - no slugs available for some reason (worker failure most likely).
      // generate a slug and make sure it doesn't exist.
      assignedSlug = await recursivelyFindAnAvailableSlug();
    }

    const shortenedUrl = await new ShortenedURL({
      slug: assignedSlug,
      target_url: targetUrl,
      owner_id: user && user.sub,
    }).save();
    return shortenedUrl;
  };
}

export const shortenURLService = new ShortenURLService();
