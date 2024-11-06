import { IConfig } from "@/types";

export const sdkDefaultConfig: Partial<IConfig> = {
  retryCount: 3,
  env: 'production',
  maxCacheCount: 20,
  interval: 5000,
  cacheUploadCount: 10,
  autoReport: true,
  openLogger: false,
}