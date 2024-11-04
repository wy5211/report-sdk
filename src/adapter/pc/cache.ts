import { IRequestData } from '@/types';

class PCCacheStore {
  private STORE_KEY = 'PC_XM_SDK_STORE_KEY';

  constructor(store) {
    this.store = store;
  }

  get() {
    return this.store.get(this.STORE_KEY);
  }

  set(data: IRequestData[]) {
    this.store.set(this.STORE_KEY, data);
  }

  clear() {}
}