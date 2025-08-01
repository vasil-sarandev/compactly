import { Router } from 'express';
import { shortenUrlRouter } from './shorten-url/router';
import { shortenUrlController } from './shorten-url/controller';

export const appRouter = Router();

appRouter.use('/shorten-url', shortenUrlRouter);
// this route is defined outside of the shortenUrlRouter because
// we want the default functionality - grabbing a shortened url
// to be available at https://compactly.com/$slug instead of https://compactly.com/shorten-url/slug
appRouter.get('/:slug', shortenUrlController.getShortenedUrlBySlug);
