import { ISlug, Slug } from '@packages/shared/schemas';
import { ICreateManyQueryPayload } from '@/lib/shared';

export interface ISlugRepository {
  insertMany: (payload: ICreateManyQueryPayload<ISlug>) => Promise<ISlug[]>;
}

class SlugRepository implements ISlugRepository {
  constructor() {}

  insertMany = async ({ data, options }: ICreateManyQueryPayload<ISlug>) => {
    return Slug.insertMany(data, options);
  };
}

export const slugRepository = new SlugRepository();
