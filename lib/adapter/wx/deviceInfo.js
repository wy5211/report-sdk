"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDeviceInfo;
function getDeviceInfo() {
    const info = wx.getDeviceInfo();
    return JSON.stringify(info);
}
