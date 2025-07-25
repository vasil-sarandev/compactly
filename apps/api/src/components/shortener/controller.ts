import { NextFunction, Request, Response } from 'express';
import { shortenerService } from './service';
import { IAuthenticatedRequest } from '@/middlewares/auth';

class ShortenerController {
  createAnonymousShortenedURL = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newShortenedUrl = await shortenerService.createShortenedUrl({
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
      const newShortenedUrl = await shortenerService.createShortenedUrl({
        user: req.user,
        targetUrl: req.body.targetUrl,
      });
      res.status(200).json(newShortenedUrl);
    } catch (err) {
      next(err);
    }
  };
}

export const shortenerController = new ShortenerController();
