import getDeviceInfo from './deviceInfo';
import cache from './cache';
import getConfig from './config';
const adapter = {
    cache: cache,
    deviceInfo: getDeviceInfo(),
    config: getConfig(),
};
export default adapter;
