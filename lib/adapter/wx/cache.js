"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WXCacheStore {
    constructor() {
        this.store = {
            get: (key) => wx.getStorageSync(key),
            set: (key, data) => wx.setStorageSync(key, data),
            clear: (key) => wx.setStorageSync(key, {})
        };
    }
    get(key) {
        return this.store.get(key);
    }
    set(key, data) {
        this.store.set(key, data);
    }
    clear(key) {
        this.store.clear(key);
    }
}
exports.default = new WXCacheStore();
