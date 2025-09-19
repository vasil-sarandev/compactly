import { ISlugPoolStat, SlugPoolStat } from '@packages/shared/schemas';
import { UpdateQueryPayload } from '@/lib/shared';

class SlugPoolStatRepository {
  constructor() {}

  updateOne = async ({ filter, update, session }: UpdateQueryPayload<ISlugPoolStat>) => {
    return SlugPoolStat.updateOne(filter, update, { session });
  };
}

export const slugPoolStatRepository = new SlugPoolStatRepository();
