import { EmitterKeys } from "../config/emitterKey";
import { ICacheKeys, IQueueCacheMapper, IRequestData } from '../types'
import mitt from "mitt";

type Events = {
  [EmitterKeys.CACHE_LIMITED_REACHED]: [ICacheKeys, IQueueCacheMapper];
  [EmitterKeys.CLEAR_CACHE]: [ICacheKeys, IRequestData];
};

const emitter = mitt<Events>();

export default emitter;