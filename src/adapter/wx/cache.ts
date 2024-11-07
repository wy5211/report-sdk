class WXCacheStore<T> {
  private store;

  constructor() {
    this.store = {
      get: (key: string) => wx.getStorageSync(key),
      set: (key: string, data: T) => wx.setStorageSync(key, data),
      clear: (key: string) => wx.setStorageSync(key, {})
    };
  }

  get(key: string) {
    return this.store.get(key);
  }

  set(key: string, data: T) {
    this.store.set(key, data);
  }

  clear(key: string) {
    this.store.clear(key);
  }
}

export default new WXCacheStore();