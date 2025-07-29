import { Router } from 'express';
import { shortenUrlRouter } from './shorten-url/router';

export const appRouter = Router();

appRouter.use('/shorten-url', shortenUrlRouter);
