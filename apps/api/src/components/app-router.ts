import { Router } from 'express';
import { shortenerRouter } from './shorten-url/router';

export const appRouter = Router();

appRouter.use('/shorten-url', shortenerRouter);
