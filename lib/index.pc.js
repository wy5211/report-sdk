"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdkManager_1 = __importDefault(require("./core/sdkManager"));
const pc_1 = __importDefault(require("./adapter/pc"));
const XMSdk = new sdkManager_1.default(pc_1.default);
exports.default = XMSdk;
