import { InferSchemaType, Schema } from 'mongoose';
export declare const shortenedURLSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type IShortenedURL = InferSchemaType<typeof shortenedURLSchema>;
export declare const ShortenedURL: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    slug: string;
    target_url: string;
    owner_id?: import("mongoose").Types.ObjectId | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=shortened-url.d.ts.map