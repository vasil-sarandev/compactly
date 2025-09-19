import { ClientSession, FilterQuery, QueryOptions, Types, UpdateQuery } from 'mongoose';

export type WithoutTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>;
export type WithId<T> = T & { _id: Types.ObjectId };

export interface MongooseGetQueryPayload<T> {
  filter: FilterQuery<T>;
  session?: ClientSession;
  options?: QueryOptions<T>;
}
export interface MongooseUpdateQueryPayload<T> extends MongooseGetQueryPayload<T> {
  update: UpdateQuery<T>;
}
export interface MongooseCreateQueryPayload<T> {
  data: WithoutTimestamps<T>;
  session?: ClientSession;
}
