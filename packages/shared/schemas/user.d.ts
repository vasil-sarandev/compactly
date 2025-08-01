import { InferSchemaType, Schema } from 'mongoose';
export declare const userSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type IUser = InferSchemaType<typeof userSchema>;
export declare const User: import("mongoose").Model<{
    name: string;
    email: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    name: string;
    email: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=user.d.ts.map