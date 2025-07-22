import { model, Schema } from 'mongoose';
import { SlugPoolType } from './slug-pool-stat';

export interface ISlug {
  _id: Schema.Types.ObjectId;
  slug: string;
  type: SlugPoolType;
}

// TODO: Make sure to index this collection so findOneAndDelete performs fast.

const slugSchema = new Schema<ISlug>(
  {
    _id: Schema.Types.ObjectId,
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

export const Slug = model('Slug', slugSchema);
