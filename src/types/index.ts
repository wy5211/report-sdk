import { SpmIdType } from '@/config/spmId';
import { EventType } from "@/config/eventType";

export type IFunc = (...args: any[]) => any;
export interface ExtInfo {
  userId: string;
  enterTimestamp: number;
  eventType: "pv" | "view" | "click" | "event";
  exitTimestamp: number;
  spmId: SpmIdType;
};
export type IPlatform = 'RN' | 'WX' | 'PC';
export interface IRequestData {
  eventType: EventType;
  deviceInfo: string;
  param: Object | Array<string>;
  extInfo: ExtInfo;
}
export interface IResponseData {
  code: number;
  msg: string;
  data: object;
  success: boolean;
}
export interface IConfig {
  /** 是否开启日志 */
  openLogger: boolean;
  /** 是否自动上传 */
  autoReport: boolean;
  /** 平台 */
  platform: IPlatform;
  /** 版本信息 */
  release: string;
  /** 环境信息 */
  env: string;
  /** 最大缓存数量 */
  maxCacheCount: number;
  /** 上传报错重试次数 */
  retryCount: number;
  /** 上传重试间隔，单位ms */
  interval: number;
  /** 上传前调整数据上报格式 */
  beforeSend: (data: IRequestData) => IRequestData;
  /** 上传请求 */
  request: (data: IRequestData) => Promise<IResponseData>;
  /** 上传后回调 */
  afterSend: (response: IResponseData) => void;
}

export interface ISdkWebManager {
  /** 初始化 sdk */
  init: (config: IConfig) => void;
  /** 上报事件 */
  triggerEvent: (eventData: IRequestData) => void;
  on: (key: string, listener: IFunc) => void;
  emit: (key: string, data: IRequestData) => void;
}

export interface IAdapter {
  
}

export interface IPlugin {
  init: (config: IConfig) => void;
}

export interface ICache {
  get: () => void;
  set: () => void;
  clear: () => void;
}