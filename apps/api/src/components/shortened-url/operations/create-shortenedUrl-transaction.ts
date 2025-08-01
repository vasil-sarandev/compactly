import mongoose, { Types } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { SlugPoolType } from '@packages/shared/schemas';
import { AppError } from '@/middlewares/error';
import { shortenedUrlRepository } from '../repository';
import { slugRepository } from '@/components/slug/repository';
import { slugPoolStatRepository } from '@/components/slug-pool-stat/repository';

export interface ICreateShortenedUrlTransactionPayload {
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
    const candidateSlug = await slugRepository.findOneAndDelete({ filter: { type }, session });
    if (!candidateSlug) {
      throw new AppError(500, 'failed to pick up a slug from slug pool');
    }
    // update the available count
    await slugPoolStatRepository.updateOne({
      filter: { type },
      update: { $inc: { availableCount: -1 } },
      session,
    });

    // create the shortened url
    const shortenedUrl = await shortenedUrlRepository.save({
      data: {
        slug: candidateSlug.slug,
        target_url: targetUrl,
        owner_id: user?.sub ? new Types.ObjectId(user.sub) : null,
      },
      session,
    });

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
