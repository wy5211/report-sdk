import { IAdapter } from './../types/index';
import type {
  IConfig,
  IRequestData,
  ITriggerData,
} from '@/types';
import UploadManager from './upload';
import CacheManager from './cache';

/**
 *
*/
class SdkWebManager {

  private config: IConfig = {} as IConfig;
  private lastRecord: ITriggerData | null = null;
  private uploader: UploadManager | undefined = undefined;
  private cache: CacheManager  | undefined = undefined;

  constructor(private adapter?: IAdapter) {}

  init (config: IConfig) {
    this.config = {
      deviceInfo: this.adapter?.deviceInfo,
      ...config,
    }

    if (config?.autoReport) {
      this.uploader = new UploadManager(config);
    } else {
      if (!this.adapter?.cache) {
        throw new Error('No cache adapter');
      }
      this.cache = new CacheManager(config, this.adapter.cache);
    }
  }

  setConfig(clientConfig: IConfig) {
    this.config = {
      ...this.config,
      ...clientConfig,
    };
  }

  triggerEvent (eventData: ITriggerData) {
    eventData.timestamp = +new Date();
    const { extInfo } = eventData || {};
    const { eventType } = extInfo || {};
    // 需要缓存第一次
    if (['pv'].includes(eventType)) {
      if (this.lastRecord) {
        const _data = this.generatePvData([this.lastRecord, eventData]);
        this.lastRecord = null;
        this.handleUploadOrCache(_data);
      } else {
        this.lastRecord = eventData;
      }
    } else {
      this.handleUploadOrCache(this.generateCommonData(eventData));
    }
  }

  handleUploadOrCache(data: IRequestData) {
    if (this.config.autoReport) {
      this.uploader!.run(data);
    } else {
      this.cache!.set(data);
    }
  }

  generateCommonData(data: ITriggerData): IRequestData {
    return {
      deviceInfo: this.config.deviceInfo,
      platform: this.config.platform,
      version: this.config.version,
      ...data,
      eventType: data.eventType,
      extInfo: [{
        userId: this.config.userId!,
        timestamp: data.timestamp!,
        ...data?.extInfo,
      }],
    }
  }

  generatePvData(data: [ITriggerData, ITriggerData]): IRequestData {
    const [start, end] = data;
    return {
      eventType: end.eventType,
      deviceInfo: this.config.deviceInfo,
      extInfo: [{
        userId: this.config.userId!,
        enterTimestamp: start.timestamp!,
        exitTimestamp: end.timestamp!,
        ...end?.extInfo,
      }]
    }
  }
}

export default SdkWebManager;