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

// index this because we're checking for conflicts when generating slugs and we want "find" to be fast
shortenedURLSchema.index({ slug: 1 }, { unique: true });

export type IShortenedURL = InferSchemaType<typeof shortenedURLSchema>;

export const ShortenedURL = model('ShortenedURL', shortenedURLSchema);
