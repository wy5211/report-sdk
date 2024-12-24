import { EmitterKeys } from "../config/emitterKey";
import { ICacheKeys, IQueueCacheMapper, IRequestData } from '../types';
type Events = {
    [EmitterKeys.CACHE_LIMITED_REACHED]: [ICacheKeys, IQueueCacheMapper];
    [EmitterKeys.CLEAR_CACHE]: [ICacheKeys, IRequestData];
};
declare const emitter: import("mitt").Emitter<Events>;
export default emitter;
