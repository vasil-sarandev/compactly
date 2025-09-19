import { ISlug, Slug } from '@packages/shared/schemas';
import { CreateManyQueryPayload } from '@/lib/shared';

class SlugRepository {
  constructor() {}

  insertMany = async ({ data, options }: CreateManyQueryPayload<ISlug>) => {
    return Slug.insertMany(data, options);
  };
}

export const slugRepository = new SlugRepository();
