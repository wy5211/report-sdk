"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deviceInfo_1 = __importDefault(require("./deviceInfo"));
const cache_1 = __importDefault(require("./cache"));
const config_1 = __importDefault(require("./config"));
const adapter = {
    cache: cache_1.default,
    deviceInfo: (0, deviceInfo_1.default)(),
    config: (0, config_1.default)(),
};
exports.default = adapter;
