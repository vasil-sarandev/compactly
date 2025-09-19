import { PageViewTopicMessage } from '@packages/shared/lib';
import { pageViewRepository } from '@/components/page-view/page-view.repository';

class PageViewConsumer {
  constructor() {}
  handlePageViewTopic = async ({
    referrer,
    ip,
    userAgent,
    shortenedUrlId,
  }: PageViewTopicMessage) => {
    await pageViewRepository.save({ data: { referrer, ip, userAgent, shortenedUrlId } });
    console.log('logged page view event');
  };
}

export const pageViewConsumer = new PageViewConsumer();
