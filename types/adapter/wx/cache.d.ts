declare class WXCacheStore<T> {
    private store;
    constructor();
    get(key: string): any;
    set(key: string, data: T): void;
    clear(key: string): void;
}
declare const _default: WXCacheStore<unknown>;
export default _default;
