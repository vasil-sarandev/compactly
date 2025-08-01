import { InferSchemaType, Schema } from 'mongoose';
export declare const pageViewSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type IPageView = InferSchemaType<typeof pageViewSchema>;
export declare const PageView: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
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
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shortenedUrlId: import("mongoose").Types.ObjectId;
    referrer: string;
    userAgent: string;
    ip: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=page-view.d.ts.map