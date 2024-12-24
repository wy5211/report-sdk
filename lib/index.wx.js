"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdkManager_1 = __importDefault(require("./core/sdkManager"));
const wx_1 = __importDefault(require("@/adapter/wx"));
const XMSdk = new sdkManager_1.default(wx_1.default);
exports.default = XMSdk;
