"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = exports.isUndef = exports.isNumber = exports.isBoolean = exports.isString = exports.isFunction = exports.isObject = void 0;
const isObject = (value) => value !== null && typeof value === 'object';
exports.isObject = isObject;
const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;
const isString = (value) => typeof value === 'string';
exports.isString = isString;
const isBoolean = (value) => typeof value === 'boolean';
exports.isBoolean = isBoolean;
const isNumber = (value) => typeof value === 'number';
exports.isNumber = isNumber;
const isUndef = (value) => typeof value === 'undefined';
exports.isUndef = isUndef;
const chunk = (list, size = 1) => {
    if (!(list === null || list === void 0 ? void 0 : list.length))
        return [];
    const arr = [];
    let index = 0;
    arr[index] = [];
    list.forEach(item => {
        if (arr[index].length < size) {
            arr[index].push(item);
        }
        if (arr[index].length === size) {
            index++;
            arr[index] = [];
            arr[index].push(item);
        }
    });
    return arr;
};
exports.chunk = chunk;
