import { requestInstance } from './request';
import { EventType } from '@/config/eventType';
import { IConfig, IRequestData, IResponseData, IQueueCacheMapper, ExtInfo, ICacheKeys } from '@/types';
import { isFunction, chunk } from '@/utils';
import emitter from './emitter';
import { EmitterKeys } from '@/config/emitterKey';
import logger from '@/utils/logger';

class UploadManager {
  /** 错误重试次数 */
  private count = 0;
  private timer: NodeJS.Timeout | undefined;

  constructor(private config: IConfig) {
    this.count = 0;
    emitter.on(EmitterKeys.CACHE_LIMITED_REACHED, (data: [ICacheKeys, IQueueCacheMapper]) => {
      logger.log('监听到上传缓存任务', data);
      this.handleCacheUpload(data);
    });
  }

  async run(data: IRequestData, cacheKey?: ICacheKeys) {
    const { request, beforeSend, afterSend, retryCount, interval } = this.config;
    let sendData = requestInstance({
      type: 'upload',
      body: data,
    });

    let response: IResponseData;
    if (beforeSend && isFunction(beforeSend)) {
      sendData = beforeSend(sendData);
    }
    try {
      logger.log('开始执行上报数据', sendData);
      response = await request(sendData) as IResponseData;
      afterSend?.(response);
      this.count = 0;

      // 清除缓存
      if (cacheKey) {
        emitter.emit(EmitterKeys.CLEAR_CACHE, [cacheKey, data]);
      }

      clearTimeout(this.timer);
    } catch (error) {
      logger.log('执行上报数据出错', error, sendData);
      if (retryCount && this.count < retryCount) {
        this.count += 1;
        this.timer = setTimeout(() => {
          this.run(data);
        }, interval)
      }
    }
  }

  handleCacheUpload(event: [ICacheKeys, IQueueCacheMapper]) {
    const [cacheKey, data] = event;
    const extraData = {
      version: this.config.version,
      platform: this.config.platform,
      deviceInfo: this.config.deviceInfo,
      env: this.config.env,
    }
    const sliceUpload = (eventType: EventType, sendData: ExtInfo[]) => {
      chunk(sendData, this.config.cacheUploadCount).forEach((item: ExtInfo[]) => {
        this.run({
          eventType,
          extInfo: item,
          // add extra data here
          ...(JSON.parse(JSON.stringify(extraData))),
        }, cacheKey);
      });
    }
    logger.log('开始分批上报数据', data);
    Object.keys(data).forEach((k) => {
      sliceUpload(k as EventType, data[k as EventType] as ExtInfo[]);
    });
  }
}

export default UploadManager;