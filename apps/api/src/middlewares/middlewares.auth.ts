import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from './middlewares.error';
import { JWT_SECRET } from '@/env-constants';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'Unauthenticated');
    }
    const user = jwt.verify(token as string, JWT_SECRET);
    req.user = user as JwtPayload;
    next();
  } catch (err) {
    if (err instanceof AppError) throw err; // 401 thrown err
    throw new AppError(403, 'Failed to authenticate');
  }
};
