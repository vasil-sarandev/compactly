import { Request, Response, NextFunction } from 'express';
import { KAFKA_LOGS_TOPIC } from '@packages/shared/lib';
import { kafka } from '@/lib/kafka/kafka.index';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const msg = `RECEIVED ${req.method} @ ${req.url} / ${Date.now()}`;
  kafka.send({
    topic: KAFKA_LOGS_TOPIC,
    messages: [{ value: msg }],
  });
  console.log(msg);
  next();
};
