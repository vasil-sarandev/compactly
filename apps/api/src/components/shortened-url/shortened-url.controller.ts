import { NextFunction, Request, Response } from 'express';
import { IShortenedURL, SlugPoolType } from '@packages/shared/schemas';
import { shortenedURLService } from './shortened-url.service';

// dont use 301, it's permanent redirect - browser will no longer hit the service after it receives it once.
const TEMPORARY_REDIRECT_HTTP_STATUS = 302;

class ShortenedURLController {
  getShortenedUrlBySlug = async (
    req: Request<{ slug: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const shortenedUrl = await shortenedURLService.getShortenedUrl({
        slug: req.params.slug,
        ip: req.ip || '',
        userAgent: req.get('User-Agent') || '',
        referrer: req.get('Referer') || '',
      });
      res.status(TEMPORARY_REDIRECT_HTTP_STATUS).set('Location', shortenedUrl.target_url).send();
    } catch (err) {
      next(err);
    }
  };
  createAnonymousShortenedURL = async (
    req: Request<{}, {}, { targetUrl: string }>,
    res: Response<IShortenedURL>,
    next: NextFunction,
  ) => {
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
    req: Request<{}, {}, { targetUrl: string }>,
    res: Response<IShortenedURL>,
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
}

export const shortenedUrlController = new ShortenedURLController();
