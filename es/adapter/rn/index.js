import getDeviceInfo from './deviceInfo';
import getConfig from './config';
const adapter = {
    deviceInfo: getDeviceInfo(),
    config: getConfig(),
};
export default adapter;
