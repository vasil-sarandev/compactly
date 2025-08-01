"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slug = exports.slugSchema = void 0;
const mongoose_1 = require("mongoose");
const slug_pool_stat_1 = require("./slug-pool-stat");
exports.slugSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: (val) => {
                return Object.values(slug_pool_stat_1.SlugPoolType).includes(val);
            },
            message: 'Unsupported slug type.',
        },
    },
}, { timestamps: true });
exports.Slug = (0, mongoose_1.model)('Slug', exports.slugSchema);
