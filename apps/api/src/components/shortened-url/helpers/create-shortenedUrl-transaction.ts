import mongoose, { Types } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { SlugPoolType } from '@packages/shared/schemas';
import { shortenedUrlRepository } from '../repository';
import { AppError } from '@/middlewares/error';
import { slugRepository } from '@/components/slug/repository';
import { slugPoolStatRepository } from '@/components/slug-pool-stat/repository';

export interface ICreateShortenedUrlTransactionPayload {
  type: SlugPoolType;
  targetUrl: string;
  user?: JwtPayload;
}

// flow for the transaction:
// 1. pull a slug from the slug pool collection
// 2. update the pool stats collection
// 3. save the shortenedUrl
// 4. commit work or abort transaction
export const createShortenedUrlTransaction = async ({
  type,
  targetUrl,
  user,
}: ICreateShortenedUrlTransactionPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const candidateSlug = await slugRepository.findOneAndDelete({ filter: { type }, session });
    if (!candidateSlug) {
      throw new AppError(500, 'failed to pick up a slug from slug pool');
    }

    await slugPoolStatRepository.updateOne({
      filter: { type },
      update: { $inc: { availableCount: -1 } },
      session,
    });

    const shortenedUrl = await shortenedUrlRepository.save({
      data: {
        slug: candidateSlug.slug,
        target_url: targetUrl,
        owner_id: user?.sub ? new Types.ObjectId(user.sub) : null,
      },
      session,
    });

    await session.commitTransaction();
    session.endSession();
    return shortenedUrl;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
