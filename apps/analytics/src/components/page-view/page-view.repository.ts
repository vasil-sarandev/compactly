import { IPageView, PageView } from '@packages/shared/schemas';
import { CreateQueryPayload } from '@/lib/shared';

class PageViewRepository {
  constructor() {}

  save = async ({ data, session }: CreateQueryPayload<IPageView>) => {
    const pageview = new PageView(data);
    return pageview.save({ session });
  };
}

export const pageViewRepository = new PageViewRepository();
