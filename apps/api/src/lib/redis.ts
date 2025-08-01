import { REDIS_CONNECTION_STRING } from '@/env-constants';
import { createClient } from 'redis';

export const redisClient = createClient({
  url: REDIS_CONNECTION_STRING,
});

export const connectRedis = async () => {
  return redisClient
    .on('error', err => {
      console.error('Redis err: ', err);
    })
    .connect();
};
