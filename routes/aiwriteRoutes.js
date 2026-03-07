import express from 'express';
import * as aiwriteController from '../controllers/aiwriteController.js';
import { verifyToken } from '../middleware/authorization.js';

import uploadMiddleware from '../middlewares/upload.middleware.js';

const router = express.Router();

// All AIWRITE routes require authentication
router.post('/generate', verifyToken, uploadMiddleware, aiwriteController.handleGenerate);
router.get('/history', verifyToken, aiwriteController.getHistory);

export default router;
