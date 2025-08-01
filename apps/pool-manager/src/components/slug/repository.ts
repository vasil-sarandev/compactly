import { ICreateManyQueryPayload } from '@/lib/shared';
import { ISlug, Slug } from '@packages/shared/schemas';

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
