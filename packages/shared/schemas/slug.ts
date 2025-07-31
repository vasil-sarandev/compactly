import { InferSchemaType, model, Schema } from 'mongoose';
import { SlugPoolType } from './slug-pool-stat';

export const slugSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      validate: {
        validator: (val: string) => {
          return Object.values(SlugPoolType).includes(val as SlugPoolType);
        },
        message: 'Unsupported slug type.',
      },
    },
  },
  { timestamps: true },
);

// index this because we need "findOneAndDelete" that matches by slug to be fast.
slugSchema.index({ slug: 1 }, { unique: true });

export type ISlug = InferSchemaType<typeof slugSchema>;

export const Slug = model('Slug', slugSchema);
