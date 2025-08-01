"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenedURL = exports.shortenedURLSchema = void 0;
const mongoose_1 = require("mongoose");
exports.shortenedURLSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    target_url: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return URL.canParse(val);
            },
            message: 'target_url must be a valid url.',
        },
    },
    owner_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });
exports.ShortenedURL = (0, mongoose_1.model)('ShortenedURL', exports.shortenedURLSchema);
