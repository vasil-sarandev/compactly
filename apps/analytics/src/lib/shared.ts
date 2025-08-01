import {
  IMongooseCreateQueryPayload,
  IMongooseGetQueryPayload,
  IMongooseUpdateQueryPayload,
} from '@packages/shared/lib';

export type IGetQueryPayload<T> = IMongooseGetQueryPayload<T>;
export type IUpdateQueryPayload<T> = IMongooseUpdateQueryPayload<T>;
export type ICreateQueryPayload<T> = IMongooseCreateQueryPayload<T>;
