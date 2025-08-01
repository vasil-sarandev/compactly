import {
  IMongooseCreateQueryPayload,
  IMongooseGetQueryPayload,
  IMongooseUpdateQueryPayload,
  IWithoutTimestamps,
} from '@packages/shared/lib';
import { InsertManyOptions } from 'mongoose';

export interface IGetQueryPayload<T> extends IMongooseGetQueryPayload<T> {}
export interface IUpdateQueryPayload<T> extends IMongooseUpdateQueryPayload<T> {}
export interface ICreateQueryPayload<T> extends IMongooseCreateQueryPayload<T> {}
export interface ICreateManyQueryPayload<T>
  extends Omit<IMongooseCreateQueryPayload<T>, 'session' | 'data'> {
  data: IWithoutTimestamps<T>[];
  options: InsertManyOptions;
}
  