import { createClient } from 'redis';
import { REDIS_CONNECTION_STRING } from '@/env-constants';

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
