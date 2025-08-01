import {
  GENERATE_SLUGS_COUNT,
  generateSlugs,
  ISlugPoolLowCountTopicMessage,
} from '@packages/shared/lib';
import mongoose from 'mongoose';
import { shortenedUrlRepository } from '@/components/shortened-url/repository';
import { slugPoolStatRepository } from '@/components/slug-pool-stat/repository';
import { slugRepository } from '@/components/slug/repository';

// flow for the transaction :
// 1. generate slugs
// 2. check for matches in shortenedUrl collection;
// 3. try to insert all of them in the slug collection -
// unique constraint there won't allow duplicates (use {ordered:false} on insert so errors with constraint don't abort inserting other records)
// 4. update the slug pool stat collection document count
// 5. commit work or abort transaction
export const handleSlugPoolLowCountTransaction = async ({
  type,
}: ISlugPoolLowCountTopicMessage) => {
  console.log('received message for low slug pool count');
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const generatedSlugs = generateSlugs(GENERATE_SLUGS_COUNT);
    const matches = await shortenedUrlRepository.find({
      filter: { slug: { $in: generatedSlugs } },
      options: { slug: 1, _id: 0 },
      session,
    });
    const existingSlugs = new Set(matches.map(match => match.slug)); // O(1) lookup
    const candidateSlugs = generatedSlugs
      .filter(slug => !existingSlugs.has(slug))
      .map(slug => ({ type, slug }));

    const insertedSlugs = await slugRepository.insertMany({
      data: candidateSlugs,
      options: { ordered: false, session },
    });
    await slugPoolStatRepository.updateOne({
      filter: { type },
      update: { $inc: { availableCount: insertedSlugs.length } },
      session,
    });

    await session.commitTransaction();
    session.endSession();
    console.log('successfully handled slug pool low count');
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    throw e;
  }
};
