import { Router } from 'express';
import { shortenedUrlController } from './controller';
import { authMiddleware } from '@/middlewares/auth';

export const shortenedUrlRouter = Router();

// get shortened url by slug is defined at app-router.ts
shortenedUrlRouter.post(`/`, authMiddleware, shortenedUrlController.createUserShortenedURL);
shortenedUrlRouter.post(`/public`, shortenedUrlController.createAnonymousShortenedURL);
