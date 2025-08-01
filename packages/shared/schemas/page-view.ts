import { InferSchemaType, model, Schema } from 'mongoose';

export const pageViewSchema = new Schema(
  {
    shortenedUrlId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ShortenedURL',
      index: true,
    },
    referrer: {
      type: String,
      default: 'no-referer',
    },
    userAgent: {
      type: String,
      default: 'no-userAgent',
    },
    ip: {
      type: String,
      default: 'no-ip',
    },
  },
  { timestamps: true },
);

export type IPageView = InferSchemaType<typeof pageViewSchema>;

export const PageView = model('PageView', pageViewSchema);
