import express from 'express';
import * as aihealthController from '../controllers/aihealthController.js';
import { verifyToken } from '../middleware/authorization.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/symptom-check', verifyToken, aihealthController.symptomCheck);
router.post('/report-analysis', verifyToken, uploadMiddleware, aihealthController.reportAnalysis);
router.post('/wellness-plan', verifyToken, aihealthController.wellnessPlan);
router.post('/mental-support', verifyToken, aihealthController.mentalSupport);
router.post('/treatment-guide', verifyToken, aihealthController.treatmentGuide);
router.post('/automation', verifyToken, aihealthController.automationScan);
router.post('/log-data', verifyToken, aihealthController.logHealthData);

export default router;
