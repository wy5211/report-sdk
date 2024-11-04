import type {
  IConfig,
  IRequestData,
  ISdkWebManager,
} from '@/types';
import emitter, { Emitter } from './emitter';

/**
 *
*/
class SdkWebManager implements ISdkWebManager {
  private config: IConfig = {};

  constructor() {}

  init (config: IConfig) {
    this.config = config;
    // TODO: add cache support by config.autoReport
    if (config?.autoReport) {
    }
  }

  triggerEvent (eventData: IRequestData) {
    // TODO: 根据配置进行选择 upload 或者 cache 模块
  }
}

export default SdkWebManager