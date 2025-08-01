import { IPageView, PageView } from '@packages/shared/schemas';
import { ICreateQueryPayload } from '@/lib/shared';

export interface IPageViewRepository {
  save: (payload: ICreateQueryPayload<IPageView>) => Promise<IPageView>;
}

class PageViewRepository implements IPageViewRepository {
  constructor() {}

  save = async ({ data, session }: ICreateQueryPayload<IPageView>) => {
    const pageview = new PageView(data);
    return pageview.save({ session });
  };
}

export const pageViewRepository = new PageViewRepository();
