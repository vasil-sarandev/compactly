import { ISlugPoolStat, SlugPoolStat } from '@packages/shared/schemas';
import { UpdateResult } from 'mongoose';
import { IUpdateQueryPayload } from '@/lib/shared';

export interface ISlugPoolStatRepository {
  updateOne: (payload: IUpdateQueryPayload<ISlugPoolStat>) => Promise<UpdateResult | null>;
}

class SlugPoolStatRepository implements ISlugPoolStatRepository {
  constructor() {}

  updateOne = async ({ filter, update, session }: IUpdateQueryPayload<ISlugPoolStat>) => {
    return SlugPoolStat.updateOne(filter, update, { session });
  };
}

export const slugPoolStatRepository = new SlugPoolStatRepository();
