import { IPageView, SlugPoolType } from '../../schemas';
import { WithoutTimestamps } from '../mongoose/mongoose.generics';

export interface SlugPoolLowCountTopicMessage {
  type: SlugPoolType;
}

export type PageViewTopicMessage = WithoutTimestamps<IPageView>;
