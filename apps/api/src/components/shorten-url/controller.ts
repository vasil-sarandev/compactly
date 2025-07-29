import { NextFunction, Request, Response } from 'express';
import { shortenURLService } from './service';
import { IAuthenticatedRequest } from '@/middlewares/auth';

class ShortenURLController {
  createAnonymousShortenedURL = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newShortenedUrl = await shortenURLService.createShortenedUrl({
        targetUrl: req.body.targetUrl,
      });
      res.status(200).json(newShortenedUrl);
    } catch (err) {
      next(err);
    }
  };
  createUserShortenedURL = async (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newShortenedUrl = await shortenURLService.createShortenedUrl({
        user: req.user,
        targetUrl: req.body.targetUrl,
      });
      res.status(200).json(newShortenedUrl);
    } catch (err) {
      next(err);
    }
  };
}

export const shortenUrlController = new ShortenURLController();
