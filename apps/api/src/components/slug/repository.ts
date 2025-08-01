import { IGetQueryPayload } from '@/lib/shared';
import { ISlug, Slug } from '@packages/shared/schemas';

export interface ISlugRepository {
  findOneAndDelete: (payload: IGetQueryPayload<ISlug>) => Promise<ISlug | null>;
}

class SlugRepository implements ISlugRepository {
  constructor() {}

  findOneAndDelete = async ({ filter, session }: IGetQueryPayload<ISlug>) => {
    return Slug.findOneAndDelete(filter, { session }).lean();
  };
}

export const slugRepository = new SlugRepository();
