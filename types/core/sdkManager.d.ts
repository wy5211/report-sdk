import type { IAdapter, IConfig, ITriggerData } from '../types';
/**
 * 调度 sdk 初始化，上传 ，缓存功能
*/
declare class SdkWebManager {
    private adapter;
    private config;
    private lastRecordStack;
    private uploader;
    private cache;
    constructor(adapter: IAdapter);
    /** 初始化 sdk */
    init(config: IConfig): Promise<void>;
    /** 动态更新配置 */
    setConfig(clientConfig: Partial<IConfig>): Promise<void>;
    /** 上报事件 */
    triggerEvent(eventData: ITriggerData): void;
    private initConfig;
    private handleUploadOrCache;
    private generateCommonData;
    private generatePvData;
    private validateCache;
    private translateCloudConfig;
}
export default SdkWebManager;
