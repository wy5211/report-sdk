import { sdkDefaultConfig } from '@/config/sdkDefault';
import type {
  IAdapter,
  ICache,
  ICloudConfigResponse,
  IConfig,
  IRequestData,
  ITriggerData,
} from '@/types';
import logger from '@/utils/logger';
import UploadManager from './upload';
import CacheManager from './cache';
import { requestInstance } from './request';
import { isFunction } from '@/utils';

/**
 * 调度 sdk 初始化，上传 ，缓存功能
*/
class SdkWebManager {

  private config: IConfig = {} as IConfig;
  private lastRecordStack: Record<string, ITriggerData | null> = {};
  private uploader: UploadManager | undefined = undefined;
  private cache: CacheManager  | undefined = undefined;

  constructor(private adapter: IAdapter) {}

  /** 初始化 sdk */
  async init (config: IConfig) {
    // 初始化配置，将传入的config注入this.config
    await this.initConfig(config);

    // 支持自定义缓存
    if (this.config.cache) {
      this.validateCache(this.config.cache);
      this.adapter.cache = this.config.cache;
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
        throw new Error(' 🚨 需要提供自定义缓存器');
      }
      this.cache = new CacheManager(this.config, this.adapter.cache);
    }

    logger.log('初始化完成',this.config);
  }

  /** 动态更新配置 */
  setConfig(clientConfig: Partial<IConfig>) {
    this.config = {
      ...this.config,
      ...clientConfig,
    };
    logger!.log(' 🎩 更新配置完成',this.config);
  }

  /** 上报事件 */
  triggerEvent (eventData: ITriggerData) {
    eventData.timestamp = +new Date();
    const { extInfo } = eventData || {};
    const { eventType, spmId } = extInfo || {};
    // 需要缓存第一次上报的 eventType
    if (['pv'].includes(eventType)) {
      if (this.lastRecordStack?.[spmId]) {
        const _data = this.generatePvData([this.lastRecordStack?.[spmId], eventData]);
        this.handleUploadOrCache(_data);
        this.lastRecordStack[spmId] = null;
      } else {
        this.lastRecordStack[spmId] = eventData;
      }
    } else {
      this.handleUploadOrCache(this.generateCommonData(eventData));
    }
  }

  private async initConfig(config: IConfig) {
    if (!('request' in config)) {
      throw new Error('请配置 request');
    }
    // 获取云端配置
    let cloudConfig = {} as ICloudConfigResponse;
    try {
      let env = config.env;
      if (config.getEnv && isFunction(config.getEnv)) {
        env = config.getEnv();
      }
      cloudConfig = await config.request(requestInstance({
        type: 'config',
        env,
      })) as ICloudConfigResponse;
    } catch (error) {
      logger.log('Error', error);
    }

    this.config = {
      ...sdkDefaultConfig,
      deviceInfo: this.adapter?.deviceInfo,
      ...config,
      ...this.translateCloudConfig(cloudConfig || {}),
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

  private validateCache(cache: ICache) {
    ['get', 'set', 'clear'].forEach((k) => {
      if (!(k in cache)) {
        throw new Error(` 🚨 自定义缓存器需要提供 【${k}】 方法`);
      }
    })
  }

  //
  private translateCloudConfig(cloudConfig: ICloudConfigResponse): Partial<IConfig> {
    return {
      maxCacheCount: cloudConfig.analysis_max_count
    }
  }
}

export default SdkWebManager;