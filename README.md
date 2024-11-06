# 前端埋点SDK - xm-web-sdk

## features
- 支持 typescript，原始包大小 ~4Kb, gzip 后 ~1.4kb
- 支持可配置化上报
- 支持埋点手动上报
- 支持埋点数据缓存批量上报
- 上报数据定制化

## install

```shell
  pnpm install xm-web-sdk
```

## usage

### 微信小程序

```typescript
import xmSdk from 'xm-web-sdk'

xmSdk.init({
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
})

// 支持动态更新配置
xmSdk.setConfig({
  userId: 'userId',
})

// 手动上报事件
xmSdk.triggerEvent({
  eventType: 'AppEvent';
  extInfo: {
    eventType: 'pv';
    spmId: 'meeting.main.xxx';
  }
})
```

### PC

```typescript
import xmSdk from 'xm-web-sdk/pc'

xmSdk.init({
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
})

// 支持动态更新配置
xmSdk.setConfig({
  userId: 'userId',
})

// 手动上报事件
xmSdk.triggerEvent({
  eventType: 'AppEvent';
  extInfo: {
    eventType: 'pv';
    spmId: 'meeting.main.xxx';
  }
})
```