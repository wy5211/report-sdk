var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { requestInstance } from './request';
import { isFunction, chunk } from '../utils';
import emitter from './emitter';
import { EmitterKeys } from '../config/emitterKey';
import logger from '../utils/logger';
class UploadManager {
    constructor(config, adapter) {
        this.config = config;
        this.adapter = adapter;
        /** 错误重试次数 */
        this.count = 0;
        this.count = 0;
        emitter.on(EmitterKeys.CACHE_LIMITED_REACHED, (data) => {
            logger.log('监听到上传缓存任务', data);
            this.handleCacheUpload(data);
        });
    }
    run(data, cacheKey) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { request, beforeSend, afterSend, retryCount, interval } = this.config;
            let sendData = requestInstance({
                type: 'upload',
                body: data,
                userId: (_a = this.config) === null || _a === void 0 ? void 0 : _a.userId,
                userChannel: (_c = (_b = this.adapter) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.userChannel,
                version: (_d = this.config) === null || _d === void 0 ? void 0 : _d.version
            });
            let response;
            if (beforeSend && isFunction(beforeSend)) {
                sendData = beforeSend(sendData);
            }
            try {
                logger.log('开始执行上报数据', sendData);
                response = (yield request(sendData));
                afterSend === null || afterSend === void 0 ? void 0 : afterSend(response);
                this.count = 0;
                // 清除缓存
                if (cacheKey) {
                    emitter.emit(EmitterKeys.CLEAR_CACHE, [cacheKey, data]);
                }
                clearTimeout(this.timer);
            }
            catch (error) {
                logger.log('执行上报数据出错', error, sendData);
                if (retryCount && this.count < retryCount) {
                    this.count += 1;
                    this.timer = setTimeout(() => {
                        this.run(data);
                    }, interval);
                }
            }
        });
    }
    handleCacheUpload(event) {
        const [cacheKey, data] = event;
        const extraData = {
            version: this.config.version,
            platform: this.config.platform,
            deviceInfo: this.config.deviceInfo,
            env: this.config.env,
        };
        const sliceUpload = (eventType, sendData) => {
            chunk(sendData, this.config.cacheUploadCount).forEach((item) => {
                this.run(Object.assign({ eventType, extInfo: item }, (JSON.parse(JSON.stringify(extraData)))), cacheKey);
            });
        };
        logger.log('开始分批上报数据', data);
        Object.keys(data).forEach((k) => {
            sliceUpload(k, data[k]);
        });
    }
}
export default UploadManager;
