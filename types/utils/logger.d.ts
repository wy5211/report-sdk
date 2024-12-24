declare class Logger {
    private open;
    constructor(open: boolean);
    set(open: boolean): void;
    log(message: string, ...args: any[]): void;
}
declare const _default: Logger;
export default _default;
