import { model, Schema } from 'mongoose';

export interface ISlug {
  _id: Schema.Types.ObjectId;
  slug: string;
}

const slugSchema = new Schema<ISlug>(
  {
    _id: Schema.Types.ObjectId,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const Slug = model('Slug', slugSchema);
