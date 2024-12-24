import { ICacheKeys } from '../types';
import emitter from './emitter';
import { EmitterKeys } from '../config/emitterKey';
import logger from '../utils/logger';
/**
 * 支持缓存数量达到一定数量自动上传
*/
class CacheManager {
    constructor(config, cacheAdapter) {
        this.queueMapper = {};
        const { maxCacheCount } = config || {};
        this.maxCacheCount = maxCacheCount;
        this.cache = cacheAdapter;
        this.queueMapper = this.cache.get(ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY) || {};
        emitter.on(EmitterKeys.CLEAR_CACHE, this.clear);
    }
    set(data) {
        this.queueMapper[data.eventType] = [
            ...(this.queueMapper[data.eventType] || []),
            ...(Array.isArray(data.extInfo) ? data.extInfo : [data.extInfo]),
        ];
        this.cache.set(ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY, this.queueMapper);
        logger.log('缓存设置成功', this.queueMapper);
        if (this.getCacheSize() >= this.maxCacheCount) {
            this.onMemoryLimitReached();
        }
    }
    onMemoryLimitReached() {
        var _a;
        const _data = (_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY);
        logger.log('缓存触发最大值', _data);
        emitter.emit(EmitterKeys.CACHE_LIMITED_REACHED, [ICacheKeys.XM_WEB_SDK_APP_EVENT_KEY, _data]);
        this.queueMapper = {};
    }
    clear(event) {
        var _a, _b, _c;
        const [key, data] = event;
        const _extInfo = Array.isArray(data.extInfo) ? data.extInfo : [data.extInfo];
        const _spmIds = _extInfo.map((e) => e.spmId) || [];
        const _cacheData = ((_b = (_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(key)) === null || _b === void 0 ? void 0 : _b[data.eventType]) || [];
        const newData = (_cacheData === null || _cacheData === void 0 ? void 0 : _cacheData.filter(e => !_spmIds.includes(e.spmId))) || [];
        this.queueMapper[data.eventType] = newData;
        (_c = this.cache) === null || _c === void 0 ? void 0 : _c.set(key, this.queueMapper);
    }
    getCacheSize() {
        return Object.values(this.queueMapper).reduce((acc, cur) => {
            acc = acc + ((cur === null || cur === void 0 ? void 0 : cur.length) || 0);
            return acc;
        }, 0);
    }
}
export default CacheManager;
