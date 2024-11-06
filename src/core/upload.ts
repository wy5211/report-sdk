import { EventType } from '@/config/eventType';
import { IQueueCacheMapper, ExtInfo } from './../types/index';
import { IConfig, IRequestData, IResponseData } from '@/types';
import { isFunction, chunk } from '@/utils';
import emitter from './emitter';
import { EmitterKeys } from '@/config/emitterKey';

class UploadManager {
  /** 错误重试次数 */
  private count = 0;
  private timer: NodeJS.Timeout | undefined;

  constructor(private config: IConfig) {
    this.count = 0;
    emitter.on(EmitterKeys.CACHE_LIMITED_REACHED, this.handleCacheUpload);
  }

  async run(data: IRequestData) {
    const { request, beforeSend, afterSend, retryCount, interval } = this.config;
    let sendData = data;
    let response: IResponseData;
    if (beforeSend && isFunction(beforeSend)) {
      sendData = beforeSend(data);
    }
    try {
      response = await request(sendData);
      afterSend(response);
      this.count = 0;
      clearTimeout(this.timer);
    } catch (error) {
      if (retryCount && this.count < retryCount) {
        this.count += 1;
        this.timer = setTimeout(() => {
          this.run(data);
        }, interval)
      }
    }
  }

  handleCacheUpload(data: IQueueCacheMapper) {
    const sliceUpload = (eventType: EventType, sendData: ExtInfo[]) => {
      chunk(sendData, 10).forEach((item: ExtInfo[]) => {
        this.run({
          eventType,
          extInfo: item,
        })
      });
    }
    Object.keys(data).forEach((k) => {
      sliceUpload(k as EventType, data[k as EventType] as ExtInfo[]);
    })
  }
}

export default UploadManager;