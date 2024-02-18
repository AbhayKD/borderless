import express from 'express';

import { wrapper } from '../utils/exceptionWrapper';
import { extractPassportDates, getPassportUploadSignedUrl } from '../controllers/passport';

const router = express.Router();

router.post('/extract-dates', wrapper(extractPassportDates));
router.get('/generate-signed-url', wrapper(getPassportUploadSignedUrl));

export default router;
