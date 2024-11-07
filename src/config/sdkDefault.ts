import { IConfig } from "@/types";

export const sdkDefaultConfig: Partial<IConfig> = {
  retryCount: 3,
  env: 'prod',
  maxCacheCount: 20,
  interval: 5000,
  cacheUploadCount: 10,
  autoReport: true,
  openLogger: false,
}