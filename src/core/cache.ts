import { IRequestData, IConfig, ICache, IQueueCacheMapper, ICacheKeys } from '../types';
import emitter from './emitter';
import { EmitterKeys } from '../config/emitterKey';
import logger from '../utils/logger';

/**
 * 支持缓存数量达到一定数量自动上传
*/
class CacheManager {
  private maxCacheCount;
  private cache: ICache | undefined;
  private queueMapper: IQueueCacheMapper = {} as IQueueCacheMapper;

  constructor(config: IConfig, cacheAdapter: ICache) {
    const { maxCacheCount } = config || {};
    this.maxCacheCount = maxCacheCount!;
    this.cache = cacheAdapter;
    this.queueMapper = this.cache.get(ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY) || {} as IQueueCacheMapper;

    emitter.on(EmitterKeys.CLEAR_CACHE, this.clear);
  }

  set(data: IRequestData) {
    this.queueMapper[data.eventType] = [
      ...(this.queueMapper[data.eventType] || []),
      ...(Array.isArray(data.extInfo) ? data.extInfo : [data.extInfo]),
    ];
    this.cache!.set(ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY, this.queueMapper);
    logger.log('缓存设置成功', this.queueMapper);
    if (this.getCacheSize() >= this.maxCacheCount) {
      this.onMemoryLimitReached();
    }
  }

  private onMemoryLimitReached() {
    const _data = this.cache?.get(ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY)!;
    logger.log('缓存触发最大值', _data);
    emitter.emit(
      EmitterKeys.CACHE_LIMITED_REACHED,
      [ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY, _data]
    );
    this.queueMapper = {} as IQueueCacheMapper;
  }

  clear(event: [ICacheKeys, IRequestData]): void {
    const [key, data] = event;
    const _extInfo = Array.isArray( data.extInfo) ? data.extInfo : [data.extInfo];
    const _spmIds = _extInfo.map((e) => e.spmId) || [];
    const _cacheData = this.cache?.get(key)?.[data.eventType] || [];
    const newData = _cacheData?.filter(e => !_spmIds.includes(e.spmId)) || [];
    this.queueMapper[data.eventType] = newData;
    this.cache?.set(key, this.queueMapper);
  }

  private getCacheSize() {
    return Object.values(this.queueMapper).reduce((acc, cur) => {
      acc = acc + (cur?.length || 0);
      return acc;
    }, 0);
  }
}

export default CacheManager;