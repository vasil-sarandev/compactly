import { IPageView, PageView } from '@packages/shared/schemas';
import { CreateQueryPayload } from '@/lib/util';

class PageViewRepository {
  constructor() {}

  save = async ({ data, session }: CreateQueryPayload<IPageView>) => {
    const pageview = new PageView(data);
    return pageview.save({ session });
  };
}

export const pageViewRepository = new PageViewRepository();
