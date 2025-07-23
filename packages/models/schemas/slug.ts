import { InferSchemaType, model, Schema } from 'mongoose';
import { SlugPoolType } from './slug-pool-stat';

// TODO: Make sure to index this collection so findOneAndDelete performs fast.
const slugSchema = new Schema(
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

export type ISlug = InferSchemaType<typeof slugSchema>;

export const Slug = model('Slug', slugSchema);
