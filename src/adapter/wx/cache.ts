class WXCacheStore<T> {
  private store;
  private STORE_KEY = 'WX_XM_SDK_STORE_KEY';

  constructor() {
    this.store = {
      get: (key: string) => wx.getStorageSync(key),
      set: (key: string, data: T) => wx.setStorageSync(key, data),
      clear: (key: string) => wx.setStorageSync(key, null)
    };
  }

  get() {
    return this.store.get(this.STORE_KEY);
  }

  set(data: T) {
    this.store.set(this.STORE_KEY, data);
  }

  clear() {}
}

export default new WXCacheStore();