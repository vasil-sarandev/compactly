import { Router } from 'express';
import { shortenUrlController } from './controller';
import { authMiddleware } from '@/middlewares/auth';

export const shortenUrlRouter = Router();

shortenUrlRouter.post('/', authMiddleware, shortenUrlController.createUserShortenedURL);
shortenUrlRouter.post('/public', shortenUrlController.createAnonymousShortenedURL);
