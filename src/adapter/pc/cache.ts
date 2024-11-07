class PCCacheStore<T> {
  private store;

  constructor() {
    this.store = {
      get: (key: string) => window.localStorage.getItem(key),
      set: (key: string, data: T) => window.localStorage.setItem(key, JSON.stringify(data)),
      clear: (key: string) => this.store.set(key, {} as T),
    };
  }

  get(key: string): T {
    const val = this.store.get(key);
    let ret: T = {} as T;
    if (val) {
      try {
        ret = JSON.parse(val ?? '{}');
      } catch (error) {}
    }
    return ret;
  }

  set(key: string, data: T) {
    this.store.set(key, data);
  }

  clear(key: string) {
    this.store.clear(key);
  }
}

export default new PCCacheStore();