import { IAdapter } from '@/types/index';
import getDeviceInfo from './deviceInfo';

const adapter: IAdapter = {
  deviceInfo: getDeviceInfo(),
}

export default adapter;