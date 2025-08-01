import { ClientSession, FilterQuery, QueryOptions, Types, UpdateQuery } from 'mongoose';
export type IWithoutTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>;
export type IWithId<T> = T & {
    _id: Types.ObjectId;
};
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
//# sourceMappingURL=generics.d.ts.map