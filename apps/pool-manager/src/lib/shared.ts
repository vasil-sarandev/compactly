import {
  MongooseCreateQueryPayload,
  MongooseGetQueryPayload,
  MongooseUpdateQueryPayload,
  WithoutTimestamps,
} from '@packages/shared/lib';
import { InsertManyOptions } from 'mongoose';

export type GetQueryPayload<T> = MongooseGetQueryPayload<T>;
export type UpdateQueryPayload<T> = MongooseUpdateQueryPayload<T>;
export type CreateQueryPayload<T> = MongooseCreateQueryPayload<T>;
export type CreateManyQueryPayload<T> = Omit<MongooseCreateQueryPayload<T>, 'session' | 'data'> & {
  data: WithoutTimestamps<T>[];
  options: InsertManyOptions;
};
