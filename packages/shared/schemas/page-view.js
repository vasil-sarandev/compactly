"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageView = exports.pageViewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pageViewSchema = new mongoose_1.Schema({
    shortenedUrlId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'ShortenedURL',
        index: true,
    },
    referrer: {
        type: String,
        default: 'no-referer',
    },
    userAgent: {
        type: String,
        default: 'no-userAgent',
    },
    ip: {
        type: String,
        default: 'no-ip',
    },
}, { timestamps: true });
exports.PageView = (0, mongoose_1.model)('PageView', exports.pageViewSchema);
