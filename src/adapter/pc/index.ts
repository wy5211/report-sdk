import { IAdapter, ICache } from '@/types/index';
import getDeviceInfo from './deviceInfo';
import cache from './cache';

const adapter: IAdapter = {
  cache: cache as ICache,
  deviceInfo: getDeviceInfo(),
}

export default adapter;