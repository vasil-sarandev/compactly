import { Request, Response, NextFunction } from 'express';
import { KAFKA_ERRORS_TOPIC } from '@packages/shared/lib';
import { kafka } from '@/lib/kafka/kafka.index';

const UNEXPECTED_ERROR_MSG = 'An unexpected error has ocurred.';

export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    next();
  }

  const status = err instanceof AppError ? err.status : 500;
  const message = err.message ?? UNEXPECTED_ERROR_MSG;

  kafka.send({
    topic: KAFKA_ERRORS_TOPIC,
    messages: [{ value: JSON.stringify({ status, message }) }],
  });
  console.error(err);

  res.status(status).json({ message });
};
