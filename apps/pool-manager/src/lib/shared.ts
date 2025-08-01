import {
  IMongooseCreateQueryPayload,
  IMongooseGetQueryPayload,
  IMongooseUpdateQueryPayload,
  IWithoutTimestamps,
} from '@packages/shared/lib';
import { InsertManyOptions } from 'mongoose';

export type IGetQueryPayload<T> = IMongooseGetQueryPayload<T>;
export type IUpdateQueryPayload<T> = IMongooseUpdateQueryPayload<T>;
export type ICreateQueryPayload<T> = IMongooseCreateQueryPayload<T>;
export type ICreateManyQueryPayload<T> = Omit<
  IMongooseCreateQueryPayload<T>,
  'session' | 'data'
> & {
  data: IWithoutTimestamps<T>[];
  options: InsertManyOptions;
};
