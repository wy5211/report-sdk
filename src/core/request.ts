import { IRequestConfig } from "@/types";

const mapper = {
  config: { method: 'GET', path: '/config/$env/common.json', hostConfigKey: 'COS_URL' },
  upload: { method: 'POST', path: '/api/log-center/logCenter/saveBurialPointInfo', hostConfigKey: 'CHANNEL_SERVER' }
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

export const requestInstance = (config: IRequestInstanceOptions): IRequestConfig => {
  return {
    method: mapper[config.type].method,
    hostConfigKey: mapper[config.type].hostConfigKey,
    path: mapper[config.type].path.replace('$env', config?.env || ''),
    body: config.body,
    header: JSON.parse(JSON.stringify({
      'Content-Type':	'application/json',
      'X-User-Id': config.userId,
      'X-User-Channel': config.userChannel,
      'X-Version': config.version,
    }))
  };
}