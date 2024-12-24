class PCCacheStore {
    constructor() {
        this.store = {
            get: (key) => window.localStorage.getItem(key),
            set: (key, data) => window.localStorage.setItem(key, JSON.stringify(data)),
            clear: (key) => this.store.set(key, {}),
        };
    }
    get(key) {
        const val = this.store.get(key);
        let ret = {};
        if (val) {
            try {
                ret = JSON.parse(val !== null && val !== void 0 ? val : '{}');
            }
            catch (error) { }
        }
        return ret;
    }
    set(key, data) {
        this.store.set(key, data);
    }
    clear(key) {
        this.store.clear(key);
    }
}
export default new PCCacheStore();
