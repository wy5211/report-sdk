declare class PCCacheStore<T> {
    private store;
    constructor();
    get(key: string): T;
    set(key: string, data: T): void;
    clear(key: string): void;
}
declare const _default: PCCacheStore<unknown>;
export default _default;
