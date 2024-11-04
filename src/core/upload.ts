import { IConfig, IRequestData, IResponseData } from '@/types';
import { isFunction } from '@/utils';

class UploadManager {
  private count = 0;
  private timer: NodeJS.Timeout | undefined;

  constructor(private config: IConfig) {
    this.count = 0;
  }

  async run(data: IRequestData) {
    const { request, beforeSend, afterSend, retryCount, interval } = this.config;
    let sendData = data;
    let response: IResponseData;
    if (beforeSend && isFunction(beforeSend)) {
      sendData = beforeSend(data);
    }
    try {
      response = await request(sendData);
      afterSend(response);
      this.count = 0;
      clearTimeout(this.timer);
    } catch (error) {
      if (retryCount && this.count < retryCount) {
        this.count += 1;
        this.timer = setTimeout(() => {
          this.run(data);
        }, interval)
      }
    }
  }
}

export default UploadManager;