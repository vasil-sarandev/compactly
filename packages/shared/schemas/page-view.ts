import { InferSchemaType, model, Schema, Types } from 'mongoose';

export const pageViewSchema = new Schema(
  {
    shortenedUrl: {
      type: Types.ObjectId,
      required: true,
      ref: 'ShortenedURL',
      index: true,
    },
    referrer: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export type IPageView = InferSchemaType<typeof pageViewSchema>;

export const PageView = model('PageView', pageViewSchema);
