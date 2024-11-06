class Logger {
  constructor(private open: boolean) {

  }

  set(open: boolean): void {
    this.open = open;
  }

  log(message: string, ...args: any[]) {
    if (!this.open) return;
    console.log(`[xm-web-sdk] ${message} info ===>`, args);
  }
}

export default new Logger(true);