import { IAdapter } from '../../types/index';
import getDeviceInfo from './deviceInfo';
import cache from './cache';
import getConfig from './config';

const adapter: IAdapter = {
  cache,
  deviceInfo: getDeviceInfo(),
  config: getConfig(),
}

export default adapter;