import { IPageView, SlugPoolType } from '../../schemas';
import { IWithoutTimestamps } from '../mongoose/generics';
export interface ISlugPoolLowCountTopicMessage {
    type: SlugPoolType;
}
export type IPageViewTopicMessage = IWithoutTimestamps<IPageView>;
//# sourceMappingURL=messages.d.ts.map