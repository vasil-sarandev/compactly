"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlugs = exports.generateSlug = void 0;
const config_1 = require("./config");
const generateSlug = (len = config_1.SLUG_LENGTH) => {
    const randomChars = [];
    for (let i = 0; i < len; i++) {
        randomChars.push(config_1.SLUG_AVAILABLE_CHARS[Math.floor(Math.random() * config_1.SLUG_AVAILABLE_CHARS.length)]);
    }
    return randomChars.join('');
};
exports.generateSlug = generateSlug;
const generateSlugs = (count) => {
    const slugs = [];
    for (let i = 0; i < count; i++) {
        slugs.push((0, exports.generateSlug)());
    }
    return slugs;
};
exports.generateSlugs = generateSlugs;
