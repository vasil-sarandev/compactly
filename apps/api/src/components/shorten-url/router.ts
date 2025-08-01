import { Router } from 'express';
import { shortenUrlController } from './controller';
import { authMiddleware } from '@/middlewares/auth';

export const shortenUrlRouter = Router();

// get shortened url by slug is defined at app-router.ts
shortenUrlRouter.post(`/`, authMiddleware, shortenUrlController.createUserShortenedURL);
shortenUrlRouter.post(`/public`, shortenUrlController.createAnonymousShortenedURL);
