import { ISlug, Slug } from '@packages/shared/schemas';
import { GetQueryPayload } from '@/lib/shared';

class SlugRepository {
  constructor() {}

  findOneAndDelete = async ({ filter, session }: GetQueryPayload<ISlug>) => {
    return Slug.findOneAndDelete(filter, { session }).lean();
  };
}

export const slugRepository = new SlugRepository();
