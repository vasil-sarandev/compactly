import { NextFunction, Request, Response } from 'express';
import { SlugPoolType } from '@packages/shared/schemas';
import { shortenedURLService } from './service';
import { IAuthenticatedRequest } from '@/middlewares/auth';
import { AppError } from '@/middlewares/error';

// dont use 301, it's permanent redirect - browser will no longer hit the service after it receives it once.
const TEMPORARY_REDIRECT_HTTP_STATUS = 302;

class ShortenedURLController {
  createAnonymousShortenedURL = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newShortenedUrl = await shortenedURLService.createShortenedUrl({
        targetUrl: req.body.targetUrl,
        type: SlugPoolType.default,
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
      const newShortenedUrl = await shortenedURLService.createShortenedUrl({
        user: req.user,
        targetUrl: req.body.targetUrl,
        type: SlugPoolType.default,
      });
      res.status(200).json(newShortenedUrl);
    } catch (err) {
      next(err);
    }
  };
  getShortenedUrlBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const slug = req.params.slug as string;
      const shortenedUrl = await shortenedURLService.getShortenedUrl(slug);
      res.status(TEMPORARY_REDIRECT_HTTP_STATUS).set('Location', shortenedUrl.target_url).send();
    } catch (err) {
      next(err);
    }
  };
}

export const shortenedUrlController = new ShortenedURLController();
