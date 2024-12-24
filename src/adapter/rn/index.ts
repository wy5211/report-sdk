import { IAdapter } from '../../types/index';
import getDeviceInfo from './deviceInfo';
import getConfig from './config';

const adapter: IAdapter = {
  deviceInfo: getDeviceInfo(),
  config: getConfig(),
}

export default adapter;