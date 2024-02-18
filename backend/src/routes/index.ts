import { Router } from 'express';

import healthCheck from './healthcheck';
import passport from './passport';

const router = Router();

router.use('/healthcheck', healthCheck);
router.use('/passport', passport);

export default router;
