import { ClientSession, FilterQuery, QueryOptions, Schema, UpdateQuery } from 'mongoose';

export type IWithoutTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>;
export type IWithId<T> = T & { _id: Schema.Types.ObjectId };

export interface IMongooseGetQueryPayload<T> {
  filter: FilterQuery<T>;
  session?: ClientSession;
  options?: QueryOptions<T>;
}
export interface IMongooseUpdateQueryPayload<T> extends IMongooseGetQueryPayload<T> {
  update: UpdateQuery<T>;
}
export interface IMongooseCreateQueryPayload<T> {
  data: IWithoutTimestamps<T>;
  session?: ClientSession;
}
