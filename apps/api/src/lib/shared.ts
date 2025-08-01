import {
  IMongooseCreateQueryPayload,
  IMongooseGetQueryPayload,
  IMongooseUpdateQueryPayload,
} from '@packages/shared/lib';

export interface IGetQueryPayload<T> extends IMongooseGetQueryPayload<T> {}
export interface IUpdateQueryPayload<T> extends IMongooseUpdateQueryPayload<T> {}
export interface ICreateQueryPayload<T> extends IMongooseCreateQueryPayload<T> {}
