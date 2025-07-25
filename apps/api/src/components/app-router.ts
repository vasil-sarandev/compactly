import { Router } from 'express';
import { shortenerRouter } from './shortener/router';

export const appRouter = Router();

appRouter.use('/shorten-url', shortenerRouter);
