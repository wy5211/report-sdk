"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdkDefault_1 = require("../config/sdkDefault");
const logger_1 = __importDefault(require("../utils/logger"));
const upload_1 = __importDefault(require("./upload"));
const cache_1 = __importDefault(require("./cache"));
const request_1 = require("./request");
const utils_1 = require("../utils");
/**
 * 调度 sdk 初始化，上传 ，缓存功能
*/
class SdkWebManager {
    constructor(adapter) {
        this.adapter = adapter;
        this.config = {};
        this.lastRecordStack = {};
        this.uploader = undefined;
        this.cache = undefined;
    }
    /** 初始化 sdk */
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // 初始化配置，将传入的config注入this.config
            yield this.initConfig(config);
            // 支持自定义缓存
            if (this.config.cache) {
                this.validateCache(this.config.cache);
                this.adapter.cache = this.config.cache;
            }
            // 添加 日志记录器
            logger_1.default.set(!!this.config.openLogger);
            // 添加 上传管理器
            this.uploader = new upload_1.default(this.config, this.adapter);
            /**
             * 根据 autoReport 判断是否开启自动上传，否则上报的数据存入缓存中，达到一定数量后进行上传
            */
            if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.autoReport)) {
                if (!((_b = this.adapter) === null || _b === void 0 ? void 0 : _b.cache)) {
                    throw new Error(' 🚨 需要提供自定义缓存器');
                }
                this.cache = new cache_1.default(this.config, this.adapter.cache);
            }
            logger_1.default.log('初始化完成', this.config);
        });
    }
    /** 动态更新配置 */
    setConfig(clientConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = Object.assign(Object.assign({}, this.config), clientConfig);
            yield this.init(this.config);
            logger_1.default.log(' 🎩 更新配置完成', this.config);
        });
    }
    /** 上报事件 */
    triggerEvent(eventData) {
        var _a, _b;
        const { reportTimeing = 'delay' } = eventData;
        eventData.timestamp = +new Date();
        const { extInfo } = eventData || {};
        const { eventType, spmId } = extInfo || {};
        // 需要缓存第一次上报的 eventType
        if (['pv'].includes(eventType) && reportTimeing === 'delay') {
            if ((_a = this.lastRecordStack) === null || _a === void 0 ? void 0 : _a[spmId]) {
                const _data = this.generatePvData([(_b = this.lastRecordStack) === null || _b === void 0 ? void 0 : _b[spmId], eventData]);
                this.handleUploadOrCache(_data);
                this.lastRecordStack[spmId] = null;
            }
            else {
                this.lastRecordStack[spmId] = eventData;
            }
        }
        else {
            this.handleUploadOrCache(this.generateCommonData(eventData));
        }
    }
    initConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!('request' in config)) {
                throw new Error('请配置 request');
            }
            // 获取云端配置
            let cloudConfig = {};
            let env = config.env;
            try {
                if (config.getEnv && (0, utils_1.isFunction)(config.getEnv)) {
                    env = config.getEnv();
                }
                cloudConfig = (yield config.request((0, request_1.requestInstance)({
                    type: 'config',
                    env,
                })));
            }
            catch (error) {
                logger_1.default.log('Error', error);
            }
            this.config = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, sdkDefault_1.sdkDefaultConfig), { deviceInfo: config.deviceInfo || ((_a = this.adapter) === null || _a === void 0 ? void 0 : _a.deviceInfo) }), config), this.translateCloudConfig(cloudConfig)), { env: env || 'prod' });
        });
    }
    handleUploadOrCache(data) {
        if (this.config.autoReport) {
            logger_1.default.log('开始上报数据', data);
            this.uploader.run(data);
        }
        else {
            logger_1.default.log('数据进入缓存', data);
            this.cache.set(data);
        }
    }
    generateCommonData(data) {
        return Object.assign(Object.assign({ deviceInfo: this.config.deviceInfo, platform: this.config.platform, version: this.config.version }, data), { eventType: data.eventType, extInfo: [Object.assign({ userId: this.config.userId, timestamp: data.timestamp }, data === null || data === void 0 ? void 0 : data.extInfo)] });
    }
    generatePvData(data) {
        const [start, end] = data;
        return {
            eventType: end.eventType,
            deviceInfo: this.config.deviceInfo,
            extInfo: [Object.assign({ userId: this.config.userId, enterTimestamp: start.timestamp, exitTimestamp: end.timestamp }, end === null || end === void 0 ? void 0 : end.extInfo)]
        };
    }
    validateCache(cache) {
        ['get', 'set', 'clear'].forEach((k) => {
            if (!(k in cache)) {
                throw new Error(` 🚨 自定义缓存器需要提供 【${k}】 方法`);
            }
        });
    }
    //
    translateCloudConfig(cloudConfig) {
        return {
            maxCacheCount: cloudConfig.analysis_max_count
        };
    }
}
exports.default = SdkWebManager;
