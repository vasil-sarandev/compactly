import { Router } from 'express';
import { shortenUrlController } from './controller';
import { authMiddleware } from '@/middlewares/auth';

export const shortenerRouter = Router();

shortenerRouter.post('/', authMiddleware, shortenUrlController.createUserShortenedURL);
shortenerRouter.post('/public', shortenUrlController.createAnonymousShortenedURL);
