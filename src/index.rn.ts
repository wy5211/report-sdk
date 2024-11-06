import SdkWebManager from "./core/sdkManager";
import adapter from '@/adapter/rn';

const XMSdk = new SdkWebManager(adapter);

export default XMSdk;