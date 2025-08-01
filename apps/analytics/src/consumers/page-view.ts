import { IPageViewTopicMessage } from '@packages/shared/lib';
import { pageViewRepository } from '@/components/page-view/repository';

export const handlePageViewTopic = async ({
  referrer,
  ip,
  userAgent,
  shortenedUrlId,
}: IPageViewTopicMessage) => {
  await pageViewRepository.save({ data: { referrer, ip, userAgent, shortenedUrlId } });
  console.log('logged page view event');
};
