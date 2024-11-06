import SdkWebManager from "./core/sdkManager";
import adapter from '@/adapter/wx';

const XMSdk = new SdkWebManager(adapter);

export default XMSdk;