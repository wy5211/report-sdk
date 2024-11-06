//@ts-ignore
import { Platform } from 'react-native';

export default function getDeviceInfo() {
  return Platform.OS;
}