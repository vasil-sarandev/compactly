import { Router } from 'express';
import { shortenerController } from './controller';
import { authMiddleware } from '@/middlewares/auth';

export const shortenerRouter = Router();

shortenerRouter.post('/', authMiddleware, shortenerController.createUserShortenedURL);
shortenerRouter.post('/public', shortenerController.createAnonymousShortenedURL);
