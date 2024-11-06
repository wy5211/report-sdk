import SdkWebManager from "./core/sdkManager";
import adapter from './adapter/pc';

const XMSdk = new SdkWebManager(adapter);

export default XMSdk;