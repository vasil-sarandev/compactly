import { InferSchemaType, model, Schema } from 'mongoose';

export const shortenedURLSchema = new Schema(
  {
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
    },
  },
  { timestamps: true },
);

export type IShortenedURL = InferSchemaType<typeof shortenedURLSchema>;

export const ShortenedURL = model('ShortenedURL', shortenedURLSchema);
