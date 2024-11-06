class PCCacheStore<T> {
  private store;
  private STORE_KEY = 'PC_XM_SDK_STORE_KEY';

  constructor() {
    this.store = {
      get: (key: string) => window.localStorage.getItem(key),
      set: (key: string, data: T) => window.localStorage.setItem(key, JSON.stringify(data)),
      clear: (key: string) => this.store.set(key, {} as T),
    };
  }

  get(): T {
    const val = this.store.get(this.STORE_KEY);
    let ret: T = {} as T;
    if (val) {
      try {
        ret = JSON.parse(val ?? '{}');
      } catch (error) {}
    }
    return ret;
  }

  set(data: T) {
    this.store.set(this.STORE_KEY, data);
  }

  clear() {
    this.store.clear(this.STORE_KEY);
  }
}

export default new PCCacheStore();