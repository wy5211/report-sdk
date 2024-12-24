import { IRequestConfig } from "../types";
declare const mapper: {
    config: {
        method: string;
        path: string;
        hostConfigKey: string;
    };
    upload: {
        method: string;
        path: string;
        hostConfigKey: string;
    };
};
interface IRequestInstanceOptions {
    type: keyof typeof mapper;
    /** dev test test1 test2 test3 prod */
    env?: string;
    method?: string;
    body?: any;
    userId?: string;
    userChannel?: string;
    version?: string;
}
export declare const requestInstance: (config: IRequestInstanceOptions) => IRequestConfig;
export {};
