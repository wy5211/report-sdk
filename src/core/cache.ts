import { IRequestData } from '@/types/type';
import { IRequestData, IConfig, ICache } from '@/types';
import emitter, { Emitter } from './emitter';
import { CACHE_LIMITED_REACHED } from '@/config/emitterKey';

const DEFAULT_MAX_CACHE_SIZE = 10;

/**
 * 缓存数量达到一定数量自动上传
*/
class CacheManager {

  private maxCacheCount = DEFAULT_MAX_CACHE_SIZE;
  private cache: ICache | undefined;
  private queue: IRequestData[] = [];

  constructor(config: IConfig) {
    const { maxCacheCount } = config || {};
    this.maxCacheCount = maxCacheCount;
    // TODO: 根据config.platform 选择 缓存
    this.cache = {} as ICache
    this.queue = this.cache.get() || [];
  }

  set(data: IRequestData) {
    if (this.getCacheSize() + 1 > this.maxCacheSize) {
      this.onMemoryLimitReached();
      return;
    }
    const queue = this.queue.concat(data)
    this.cache.set(queue);
    this.queue = queue;
  }

  private onMemoryLimitReached() {
    emitter.emit(CACHE_LIMITED_REACHED);
  }

  private getCacheSize() {
    return this.queue.length;
  }
}

export default CacheManager;