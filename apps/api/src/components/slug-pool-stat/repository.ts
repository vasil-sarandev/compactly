import { ISlugPoolStat, SlugPoolStat } from '@packages/shared/schemas';
import { UpdateResult } from 'mongoose';
import { IGetQueryPayload, IUpdateQueryPayload } from '@/lib/shared';

export interface ISlugPoolStatRepository {
  findOne: (payload: IGetQueryPayload<ISlugPoolStat>) => Promise<ISlugPoolStat | null>;
  updateOne: (payload: IUpdateQueryPayload<ISlugPoolStat>) => Promise<UpdateResult | null>;
}

class SlugPoolStatRepository implements ISlugPoolStatRepository {
  constructor() {}

  findOne = async ({ filter }: IGetQueryPayload<ISlugPoolStat>) => {
    return SlugPoolStat.findOne(filter).lean();
  };

  updateOne = async ({ filter, update, session }: IUpdateQueryPayload<ISlugPoolStat>) => {
    return SlugPoolStat.updateOne(filter, update, { session });
  };
}

export const slugPoolStatRepository = new SlugPoolStatRepository();
