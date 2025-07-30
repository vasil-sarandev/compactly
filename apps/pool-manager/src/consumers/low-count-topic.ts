import { ShortenedURL, Slug, SlugPoolStat, SlugPoolType } from '@shared/models/schemas';
import { GENERATE_SLUGS_COUNT, generateSlugs } from '@shared/util';
import mongoose from 'mongoose';

const EXPECTED_GENERATE_SLUGS_COUNT_MODIFIER = 1.5;

export const handleSlugPoolLowCount = async (type: SlugPoolType.default) => {
  console.log('received message for low slug pool count');
  // wrap work in a transaction because we need this to be atomic
  // (so we don't mess up the slug pool stats and avoid conflicts in generated slugs)
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // use a multiplier for the expected count in case slugs that are already present
    // in the database are generated.
    const slugsCount = GENERATE_SLUGS_COUNT * EXPECTED_GENERATE_SLUGS_COUNT_MODIFIER;
    const generatedSlugs = generateSlugs(slugsCount);

    const matches = await ShortenedURL.find(
      { slug: { $in: generatedSlugs } },
      { slug: 1, _id: 0 },
      { session },
    ).lean();
    // transform the matches into a Set because of O(1) lookup
    const existingSlugs = new Set(matches.map(match => match.slug));
    // filter out the candidate slugs for insertion.
    const candidateSlugs = generatedSlugs.filter(slug => !existingSlugs.has(slug));

    // insert slugs using {ordered:false} so we don't abort other records on errors.
    // some insertions may fail because of the "unique" constraint on 'slug' property and that's expected.
    const insertedSlugs = await Slug.insertMany(
      candidateSlugs.map(slug => ({ type, slug })),
      { ordered: false, session },
    );
    // update the slug pool stats count
    await SlugPoolStat.updateOne(
      { type },
      { $inc: { availableCount: insertedSlugs.length } },
      { session },
    );

    // commit the transaction and close the session
    await session.commitTransaction();
    session.endSession();
    console.log('successfully handled slug pool low count');
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    throw e;
  }
};
