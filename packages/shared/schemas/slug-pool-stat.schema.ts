import { InferSchemaType, model, Schema } from 'mongoose';

export enum SlugPoolType {
  default = 'DEFAULT',
  reserved = 'RESERVED',
}

export const slugPoolStatSchema = new Schema(
  {
    type: {
      type: String,
      unique: true,
      validate: {
        validator: (type: string) => {
          return Object.values(SlugPoolType).includes(type as SlugPoolType);
        },
        message: 'Unsupported slug type.',
      },
    },
    availableCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export type ISlugPoolStat = InferSchemaType<typeof slugPoolStatSchema>;

export const SlugPoolStat = model('SlugPoolStat', slugPoolStatSchema);
