import { IRequestData, IConfig, ICache, IQueueCacheMapper } from '@/types';
import emitter from './emitter';
import { EmitterKeys } from '@/config/emitterKey';

const DEFAULT_MAX_CACHE_SIZE = 10;

/**
 * 缓存数量达到一定数量自动上传
*/
class CacheManager {

  private maxCacheCount = DEFAULT_MAX_CACHE_SIZE;
  private cache: ICache | undefined;
  private queueMapper: IQueueCacheMapper = {} as IQueueCacheMapper;

  constructor(config: IConfig, cacheAdapter: ICache) {
    const { maxCacheCount } = config || {};
    this.maxCacheCount = maxCacheCount;
    this.cache = cacheAdapter;
    this.queueMapper = this.cache.get() || {} as IQueueCacheMapper;
  }

  set(data: IRequestData) {
    this.queueMapper[data.eventType] = [
      ...(this.queueMapper[data.eventType] || []),
      ...(Array.isArray(data.extInfo) ? data.extInfo : [data.extInfo]),
    ];
    this.cache!.set(this.queueMapper);
    if (this.getCacheSize() + 1 >= this.maxCacheCount) {
      this.onMemoryLimitReached();
    }
  }

  private onMemoryLimitReached() {
    emitter.emit(
      EmitterKeys.CACHE_LIMITED_REACHED,
      this.cache?.get()!
    );
  }

  private getCacheSize() {
    return Object.values(this.queueMapper).reduce((acc, cur) => {
      acc = acc + (cur?.length || 0);
      return acc;
    }, 0);
  }
}

export default CacheManager;