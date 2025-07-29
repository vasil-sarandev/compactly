import mongoose, { model } from 'mongoose';
import { ISlugPoolStat, slugPoolStatSchema, SlugPoolType } from '@shared/models/schemas';

const SlugPoolStat = model('SlugPoolStat', slugPoolStatSchema);

const MOCK_SLUG_POOLS: Omit<ISlugPoolStat, '_id' | 'createdAt' | 'updatedAt'>[] = [
  { type: SlugPoolType.default, availableCount: 0 },
  { type: SlugPoolType.reserved, availableCount: 0 },
];

// the pool-manager application should own this seed
export const seedSlugPoolStats = async (databaseUri: string) => {
  try {
    const mongooseInstance = await mongoose.connect(databaseUri);

    const slugPoolStatsCount = await SlugPoolStat.countDocuments();

    if (slugPoolStatsCount === MOCK_SLUG_POOLS.length) {
      // no need to seed, the data is there
      await mongooseInstance.disconnect();
      console.log('skipping slug pool stats collection seed.');
      return;
    }

    await SlugPoolStat.insertMany(MOCK_SLUG_POOLS);
    await mongooseInstance.disconnect();
    console.log('successfully seeded the slug pool stats collection.');
  } catch (e) {
    console.error('an error occured while seeding slug pool stats.');
    throw e;
  }
};
