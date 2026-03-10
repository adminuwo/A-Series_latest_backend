import express from 'express';
import * as chatController from '../controllers/chat.controller.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';
import { optionalVerifyToken, verifyToken } from '../middleware/authorization.js';
import { identifyGuest } from '../middleware/guestMiddleware.js';

const router = express.Router();

router.get('/history', optionalVerifyToken, identifyGuest, chatController.getHistory);
router.delete('/history', verifyToken, chatController.clearHistory);
router.get('/:id', optionalVerifyToken, identifyGuest, chatController.getConversation);
router.delete('/:id', verifyToken, chatController.deleteConversation);
router.post('/upload', optionalVerifyToken, identifyGuest, uploadMiddleware, chatController.uploadAttachment); // New Route
router.post('/', optionalVerifyToken, identifyGuest, chatController.chat);

export default router;
