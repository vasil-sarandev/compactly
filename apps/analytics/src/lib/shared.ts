import {
  MongooseCreateQueryPayload,
  MongooseGetQueryPayload,
  MongooseUpdateQueryPayload,
} from '@packages/shared/lib';

export type GetQueryPayload<T> = MongooseGetQueryPayload<T>;
export type UpdateQueryPayload<T> = MongooseUpdateQueryPayload<T>;
export type CreateQueryPayload<T> = MongooseCreateQueryPayload<T>;
