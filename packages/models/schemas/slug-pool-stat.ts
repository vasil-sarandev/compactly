import { model, Schema } from 'mongoose';

export enum SlugPoolType {
  default = 'DEFAULT',
  reserved = 'RESERVED',
}

export interface ISlugPoolStat {
  _id: Schema.Types.ObjectId;
  type: SlugPoolType;
  availableCount: Schema.Types.Number;
  createdAt: string; // system field
  updatedAt: string; // system field
}

const slugPoolStatSchema = new Schema<ISlugPoolStat>(
  {
    _id: Schema.Types.ObjectId,
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
  },
  { timestamps: true },
);

export const SlugPoolStat = model('SlugPoolStat', slugPoolStatSchema);
