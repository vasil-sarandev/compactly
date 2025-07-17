import { model, Schema } from 'mongoose';

export interface IShortenedURL {
  _id: Schema.Types.ObjectId;
  slug: string;
  target_url: string;
  owner_id: Schema.Types.ObjectId;
  createdAt: string; // system field
  updatedAt: string; // system field
}

const shortenedURLSchema = new Schema<IShortenedURL>(
  {
    _id: Schema.Types.ObjectId,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    target_url: {
      type: String,
      required: true,
      validate: {
        validator: (val: string) => {
          return URL.canParse(val);
        },
        message: 'target_url must be a valid url.',
      },
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const ShortenedURL = model('ShortenedURL', shortenedURLSchema);
