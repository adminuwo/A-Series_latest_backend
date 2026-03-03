import express from 'express';
import multer from 'multer';
import * as openaiController from '../controllers/openaiController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/content', openaiController.smartContentWriter);
router.post('/chat', openaiController.aiChatAssistant);
router.post('/image', openaiController.aiImageCreator);
router.post('/text-to-speech', openaiController.voiceNarration);
router.post('/speech-to-text', upload.single('audio'), openaiController.audioTranscriber);
router.post('/code', openaiController.aiCodeAssistant);
router.post('/document', openaiController.documentIntelligence);
router.post('/vision', openaiController.visionAnalyzer);
router.post('/search', openaiController.realTimeWebSearch);
router.post('/translate', openaiController.professionalTranslator);
router.post('/extract', openaiController.structuredDataExtractor);

export default router;
