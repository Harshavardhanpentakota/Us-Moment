import { Hono } from 'hono';
import { accountRouter } from './account';
import { roadMapRouter } from './roadmap';

const mainRouter = new Hono();
mainRouter.route('/account', accountRouter);
mainRouter.route('/roadmaps', roadMapRouter);

export { mainRouter };
