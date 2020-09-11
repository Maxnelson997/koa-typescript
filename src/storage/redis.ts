import * as Interfaces from "../types/interfaces";
import { config } from "../config";

const redis = require("redis");

const { promisify } = require("util");
// import { promisify } from 'util';

export function redisStorage(): Interfaces.IStorage {
  const client = redis.createClient(config.redis);

  const rpush = promisify(client.rpush).bind(client);
  const lrem = promisify(client.lrem).bind(client);
  const lrange = promisify(client.lrange).bind(client);

  return {
    get: (list: string) => {
      return lrange(list, 0, -1)
        .then((val: string[]) => val)
        .catch((err: Error) => []);
    },
    add: (list: string, skill: string) => {
      return rpush(list, skill)
        .then((val: number) => val > 0)
        .catch((err: Error) => false);
    },
    remove: (list: string, skill: string) => {
      return lrem(list, 0, skill)
        .then((val: number) => val > 0)
        .catch((err: Error) => false);
    }
  };
}
