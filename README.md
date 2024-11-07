# 前端埋点SDK - xm-web-sdk

## features
- 支持 typescript，原始包大小 ~4Kb, gzip 后 ~1.4kb
- 支持可配置化上报
- 支持埋点手动上报
- 支持埋点数据缓存批量上报
- 上报数据定制化
- 支持自定义缓存

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
  /** 自定义缓存器 */
  cache?: ICache;
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

## 本地调试

1. 克隆代码[https://gitlab.yofoto.cn/xm/client/front_libs/xm_web_sdk/-/tree/feat/sdk]
```shell
  git clone https://gitlab.yofoto.cn/xm/client/front_libs/xm_web_sdk.git
```

2. 切换分支到 **feat/sdk**，执行 pnpm install
```shell
  git checkout feat/sdk

  pnpm install
```

3. 执行本地打包后，加入 link 链接
```shell
  pnpm build

  pnpm link --global
```

4. 在导入的项目中依赖添加 "xm-web-sdk": "~1.0.1",再使用 npm link 链接到 node_modules
package.json
```json
  {
    "xm-web-sdk": "~1.0.1"
  }
```

```shell
  pnpm link --global xm-web-sdk
```

**注意：小程序执行完上面步骤后需要在微信开发者工具执行 npm构建**