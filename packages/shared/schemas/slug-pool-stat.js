"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugPoolStat = exports.slugPoolStatSchema = exports.SlugPoolType = void 0;
const mongoose_1 = require("mongoose");
var SlugPoolType;
(function (SlugPoolType) {
    SlugPoolType["default"] = "DEFAULT";
    SlugPoolType["reserved"] = "RESERVED";
})(SlugPoolType || (exports.SlugPoolType = SlugPoolType = {}));
exports.slugPoolStatSchema = new mongoose_1.Schema({
    type: {
        type: String,
        unique: true,
        validate: {
            validator: (type) => {
                return Object.values(SlugPoolType).includes(type);
            },
            message: 'Unsupported slug type.',
        },
    },
    availableCount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.SlugPoolStat = (0, mongoose_1.model)('SlugPoolStat', exports.slugPoolStatSchema);
