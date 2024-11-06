import { sdkDefaultConfig } from '@/config/sdkDefault';
import type {
  IAdapter,
  IConfig,
  IRequestData,
  ITriggerData,
} from '@/types';
import UploadManager from './upload';
import CacheManager from './cache';
import logger from '@/utils/logger';

/**
 * 调度 sdk 初始化，上传 ，缓存功能
*/
class SdkWebManager {

  private config: IConfig = {} as IConfig;
  private lastRecord: ITriggerData | null = null;
  private uploader: UploadManager | undefined = undefined;
  private cache: CacheManager  | undefined = undefined;

  constructor(private adapter?: IAdapter) {}

  /** 初始化 sdk */
  init (config: IConfig) {
    this.config = {
      ...sdkDefaultConfig,
      deviceInfo: this.adapter?.deviceInfo,
      ...config,
    }

    // 添加 日志记录器
    logger.set(!!this.config.openLogger);

    // 添加 上传管理器
    this.uploader = new UploadManager(this.config);
    /**
     * 根据 autoReport 判断是否开启自动上传，否则上报的数据存入缓存中，达到一定数量后进行上传
    */
    if (!this.config?.autoReport) {
      if (!this.adapter?.cache) {
        throw new Error('No cache adapter');
      }
      this.cache = new CacheManager(config, this.adapter.cache);
    }

    logger.log('初始化完成',this.config);
  }

  /** 动态更新配置 */
  setConfig(clientConfig: Partial<IConfig>) {
    this.config = {
      ...this.config,
      ...clientConfig,
    };
    logger!.log('更新配置完成',this.config);
  }

  /** 上报事件 */
  triggerEvent (eventData: ITriggerData) {
    eventData.timestamp = +new Date();
    const { extInfo } = eventData || {};
    const { eventType } = extInfo || {};
    // 需要缓存第一次上报的 eventType
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

  private handleUploadOrCache(data: IRequestData) {
    if (this.config.autoReport) {
      logger!.log('开始上报数据', data);

      this.uploader!.run(data);
    } else {
      logger!.log('数据进入缓存',data);

      this.cache!.set(data);
    }
  }

  private generateCommonData(data: ITriggerData): IRequestData {
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

  private generatePvData(data: [ITriggerData, ITriggerData]): IRequestData {
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