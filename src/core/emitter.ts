import mitt from "mitt";

const emitter = mitt();
export type Emitter = typeof emitter;
export default emitter;