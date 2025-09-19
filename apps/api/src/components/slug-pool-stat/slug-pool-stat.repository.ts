import { ISlugPoolStat, SlugPoolStat } from '@packages/shared/schemas';
import { GetQueryPayload, UpdateQueryPayload } from '@/lib/shared';

class SlugPoolStatRepository {
  constructor() {}

  findOne = async ({ filter }: GetQueryPayload<ISlugPoolStat>) => {
    return SlugPoolStat.findOne(filter).lean();
  };

  updateOne = async ({ filter, update, session }: UpdateQueryPayload<ISlugPoolStat>) => {
    return SlugPoolStat.updateOne(filter, update, { session });
  };
}

export const slugPoolStatRepository = new SlugPoolStatRepository();
