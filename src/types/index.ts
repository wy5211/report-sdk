import { EventType } from "@/config/eventType";

export type IFunc = (...args: any[]) => any;

export type ExtInfoEventType = "pv" | "view" | "click" | "event";

export interface ExtInfo {
  userId?: string;
  enterTimestamp?: number;
  eventType: ExtInfoEventType;
  exitTimestamp?: number;
  spmId: string;
  timestamp?: number;
};

export type IPlatform = 'RN' | 'WX' | 'PC';

/** 调用接口传参 data */
export interface IRequestData {
  eventType: EventType;
  extInfo: ExtInfo | ExtInfo[];
  deviceInfo?: string;
  param?: Object | Array<string>;
  platform?: string;
  userId?: string;
  version?: string;
}

/** 接口响应数据 */
export interface IResponseData {
  code: number;
  msg: string;
  data: object;
  success: boolean;
}

/** 初始化配置 */
export interface IConfig {
  /** 是否开启日志，默认 false */
  openLogger?: boolean;
  /** 是否自动上传, 默认 true */
  autoReport?: boolean;
  /** 平台 */
  platform?: IPlatform;
  /** 版本信息 */
  version?: string;
  /** 环境信息 */
  env?: string;
  /** 最大缓存数量, 默认 20 */
  maxCacheCount?: number;
  /** 上传报错重试次数, 默认 3 */
  retryCount?: number;
  /** 上传重试间隔，单位ms, 默认 5000ms */
  interval?: number;
  /** 设备信息 */
  deviceInfo?: string;
  /** 用户 id */
  userId?: string;
  /** 缓存分批上传数量, 默认 10 */
  cacheUploadCount?: number;
  /** 上传前调整数据上报格式 */
  beforeSend?: (data: IRequestData) => IRequestData;
  /** 上传请求 */
  request: (data: IRequestData) => Promise<IResponseData>;
  /** 上传后回调 */
  afterSend?: (response: IResponseData) => void;
}
/** 用户需要上传的数据 */
export interface ITriggerData {
  eventType: EventType;
  extInfo: {
    eventType: ExtInfoEventType;
    spmId: string;
  },
  timestamp?: number;
}

export interface IAdapter {
  cache?: ICache;
  deviceInfo?: string;
}

export type IQueueCacheMapper = Record<EventType, IRequestData['extInfo'][]>

export interface ICache {
  get: () => IQueueCacheMapper;
  set: (data: IQueueCacheMapper) => void;
  clear: () => void;
}
