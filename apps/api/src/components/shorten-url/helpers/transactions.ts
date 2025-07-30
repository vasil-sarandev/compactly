import { ShortenedURL, Slug, SlugPoolStat, SlugPoolType } from '@shared/models/schemas';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { recursivelyFindAnAvailableSlug } from './find-available-slug';
import { AppError } from '@/middlewares/error';

interface ICreateShortenedUrlTransactionPayload {
  type: SlugPoolType;
  targetUrl: string;
  user?: JwtPayload;
}
export const createShortenedUrlTransaction = async (
  payload: ICreateShortenedUrlTransactionPayload,
) => {
  const { type, targetUrl, user } = payload;
  // wrap work in a transaction because we need this to be atomic
  // (so we don't pick up the same slug for different API calls or mess up the available count updates).
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // pick up a slug from pool
    const candidateSlug = await Slug.findOneAndDelete({ type }, { session }).lean();
    if (!candidateSlug) {
      throw new AppError(500, 'failed to pick up a slug from slug pool');
    }
    // update the available count
    await SlugPoolStat.updateOne({ type }, { $inc: { availableCount: -1 } }, { session });

    // create the shortened url
    const shortenedUrl = await new ShortenedURL({
      slug: candidateSlug.slug,
      target_url: targetUrl,
      owner_id: user && user.sub,
    }).save();

    // commit the transaction and close the session
    await session.commitTransaction();
    session.endSession();

    return shortenedUrl;
  } catch (err) {
    // abort work
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const createShortenedUrlDisasterScenario = async (
  payload: ICreateShortenedUrlTransactionPayload,
) => {
  const { targetUrl, user } = payload;
  const slug = await recursivelyFindAnAvailableSlug();
  const shortenedUrl = await new ShortenedURL({
    slug,
    target_url: targetUrl,
    owner_id: user && user.sub,
  }).save();
  return shortenedUrl;
};
