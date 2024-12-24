"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdkManager_1 = __importDefault(require("./core/sdkManager"));
const rn_1 = __importDefault(require("@/adapter/rn"));
const XMSdk = new sdkManager_1.default(rn_1.default);
exports.default = XMSdk;
