import { Router } from 'express';
import { shortenedUrlRouter } from './shortened-url/shortened-url.router';
import { shortenedUrlController } from './shortened-url/shortened-url.controller';

export const appRouter = Router();

appRouter.use('/shorten-url', shortenedUrlRouter);
// this route is defined outside of the shortenUrlRouter because
// we want the default functionality - grabbing a shortened url
// to be available at https://compactly.com/$slug instead of https://compactly.com/shorten-url/slug
appRouter.get('/:slug', shortenedUrlController.getShortenedUrlBySlug);
