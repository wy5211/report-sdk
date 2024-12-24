import { IRequestData, IConfig, ICache, ICacheKeys } from '../types';
/**
 * 支持缓存数量达到一定数量自动上传
*/
declare class CacheManager {
    private maxCacheCount;
    private cache;
    private queueMapper;
    constructor(config: IConfig, cacheAdapter: ICache);
    set(data: IRequestData): void;
    private onMemoryLimitReached;
    clear(event: [ICacheKeys, IRequestData]): void;
    private getCacheSize;
}
export default CacheManager;
