import { IAdapter, ICache } from '../../types/index';
import getDeviceInfo from './deviceInfo';
import cache from './cache';
import getConfig from './config';

const adapter: IAdapter = {
  cache: cache as ICache,
  deviceInfo: getDeviceInfo(),
  config: getConfig(),
}

export default adapter;