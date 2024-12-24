import { IAdapter } from './../types/index';
import { IConfig, IRequestData, IQueueCacheMapper, ICacheKeys } from '../types';
declare class UploadManager {
    private config;
    private adapter;
    /** 错误重试次数 */
    private count;
    private timer;
    constructor(config: IConfig, adapter: IAdapter);
    run(data: IRequestData, cacheKey?: ICacheKeys): Promise<void>;
    handleCacheUpload(event: [ICacheKeys, IQueueCacheMapper]): void;
}
export default UploadManager;
