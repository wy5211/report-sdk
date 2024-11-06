declare namespace wx {
  export function getStorageSync(key: string): any;
  export function setStorageSync(key: string, data: unknown): void;
  export function getDeviceInfo(): object;
}