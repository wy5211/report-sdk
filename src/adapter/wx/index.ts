import { IAdapter } from '@/types/index';
import getDeviceInfo from './deviceInfo';
import cache from './cache';

const adapter: IAdapter = {
  cache,
  deviceInfo: getDeviceInfo(),
}

export default adapter;