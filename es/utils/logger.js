class Logger {
    constructor(open) {
        this.open = open;
    }
    set(open) {
        this.open = open;
    }
    log(message, ...args) {
        if (!this.open)
            return;
        console.log(`[xm-web-sdk] ${message} info ===>`, args);
    }
}
export default new Logger(true);
