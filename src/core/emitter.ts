import { EmitterKeys } from "@/config/emitterKey";
import { IQueueCacheMapper } from '@/types'
import mitt from "mitt";

type Events = {
  [EmitterKeys.CACHE_LIMITED_REACHED]: IQueueCacheMapper;
};

const emitter = mitt<Events>();

export default emitter;