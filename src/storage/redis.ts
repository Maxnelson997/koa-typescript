import * as Interfaces from "../types/interfaces";
import { config } from "../config";

const redis = require("redis");
const client = redis.createClient(config.redis);

export const redisStorage: Interfaces.IStorage = {
  get: (list_name: string) => [],
  add: (list_name: string, item: string) => false,
  remove: (list_name: string, item: string) => false
};
