import { ISlug, Slug } from '@shared/models';

export interface ISlugRepository {
  findOneAndDelete: () => Promise<ISlug | null>;
}

class SlugRepository implements ISlugRepository {
  constructor() {}

  findOneAndDelete = async () => {
    const res = await Slug.findOneAndDelete();
    return res;
  };
}

export const slugRepository = new SlugRepository();
