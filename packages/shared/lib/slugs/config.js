"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLUG_AVAILABLE_CHARS = exports.SLUG_LENGTH = exports.GENERATE_SLUGS_COUNT = exports.SLUG_POOL_LOW_THRESHHOLD_COUNT = void 0;
// the availableCount thresh hold under which the worker (pool-manager) will attempt to fill up the pool
exports.SLUG_POOL_LOW_THRESHHOLD_COUNT = 500;
// the minimum number of slugs to generate when the low threshhold is reached.
exports.GENERATE_SLUGS_COUNT = 1000;
// 6 is pretty sufficient for now - there's 52 available chars so with only 6 character length slugs,
// we got like 52^6 variations which equals to 19,770,609,664 or ~20 billion unique slugs. Can always change it in the future.
exports.SLUG_LENGTH = 6;
// prettier-ignore
const SLUG_AVAILABLE_CHARS_LOWERCASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const SLUG_AVAILABLE_CHARS_UPPERCASE = SLUG_AVAILABLE_CHARS_LOWERCASE.map(c => c.toUpperCase());
exports.SLUG_AVAILABLE_CHARS = [
    ...SLUG_AVAILABLE_CHARS_LOWERCASE,
    ...SLUG_AVAILABLE_CHARS_UPPERCASE,
];
