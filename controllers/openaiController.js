import openaiService from '../services/openaiService.js';
import UsageTracking from '../models/UsageTracking.js';
import Agent from '../models/Agents.js';
import logger from '../utils/logger.js';
import { performWebSearch } from '../services/searchService.js';
import { processSearchResults, getWebSearchSystemInstruction } from '../utils/webSearch.js';

const logUsage = async (userId, agentSlug, tokensUsed = 0, featureName = '') => {
    try {
        const agent = await Agent.findOne({ slug: agentSlug });
        const agentId = agent ? agent._id : null;

        await UsageTracking.findOneAndUpdate(
            { userId, agentId },
            {
                $inc: { tokensUsed, messagesSent: 1 },
                $set: { lastUsed: new Date(), provider: 'openai' },
                $push: { featuresUsed: { name: featureName, timestamp: new Date() } }
            },
            { upsert: true, new: true }
        );
    } catch (error) {
        logger.error(`[USAGE LOG ERROR] ${error.message}`);
    }
};

export const smartContentWriter = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const result = await openaiService.generateContent(prompt, 'gpt-4.1');
        await logUsage(req.user?.id || 'admin', 'tool-openai-content', result.usage?.total_tokens, 'Smart Content Writer');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};

export const aiChatAssistant = async (req, res, next) => {
    try {
        const { message } = req.body;
        const result = await openaiService.generateContent(message, 'gpt-4.1-mini');
        await logUsage(req.user?.id || 'admin', 'tool-openai-chat', result.usage?.total_tokens, 'AI Chat Assistant');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};

export const aiImageCreator = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const imageUrl = await openaiService.generateImage(prompt, 'gpt-image-1');
        await logUsage(req.user?.id || 'admin', 'tool-openai-image', 0, 'AI Image Creator Pro');
        res.status(200).json({ success: true, data: imageUrl });
    } catch (error) {
        next(error);
    }
};

export const voiceNarration = async (req, res, next) => {
    try {
        const { text } = req.body;
        const audioBuffer = await openaiService.textToSpeech(text, 'gpt-4o-mini-tts');
        await logUsage(req.user?.id || 'admin', 'tool-openai-tts', 0, 'Voice Narration Studio');
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
    } catch (error) {
        next(error);
    }
};

export const audioTranscriber = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'Audio file required' });
        const text = await openaiService.speechToText(req.file.buffer, 'gpt-4o-transcribe');
        await logUsage(req.user?.id || 'admin', 'tool-openai-stt', 0, 'Audio Transcriber');
        res.status(200).json({ success: true, data: text });
    } catch (error) {
        next(error);
    }
};

export const aiCodeAssistant = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const result = await openaiService.generateContent(prompt, 'gpt-4.1');
        await logUsage(req.user?.id || 'admin', 'tool-openai-code', result.usage?.total_tokens, 'AI Code Assistant');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};

export const documentIntelligence = async (req, res, next) => {
    try {
        const { prompt, content } = req.body; // Expecting pre-extracted text for now
        const fullPrompt = `Document Content:\n${content}\n\nTask: ${prompt}`;
        const result = await openaiService.generateContent(fullPrompt, 'gpt-4.1');
        await logUsage(req.user?.id || 'admin', 'tool-openai-document', result.usage?.total_tokens, 'Document Intelligence');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};

export const visionAnalyzer = async (req, res, next) => {
    try {
        const { imageUrl, prompt } = req.body;
        const result = await openaiService.visionAnalysis(imageUrl, prompt, 'gpt-4.1');
        await logUsage(req.user?.id || 'admin', 'tool-openai-vision', result.usage?.total_tokens, 'Vision Analyzer');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};

export const realTimeWebSearch = async (req, res, next) => {
    try {
        const { query, language, isDeepSearch } = req.body;

        if (!query) {
            return res.status(400).json({ success: false, message: 'Search query is required' });
        }

        // 1. Perform raw search
        const rawSearchData = await performWebSearch(query, isDeepSearch ? 10 : 5);
        if (!rawSearchData) {
            return res.status(500).json({ success: false, message: 'Web search failed' });
        }

        // 2. Process results
        const results = processSearchResults(rawSearchData, isDeepSearch ? 10 : 5);

        // 3. Summarize with OpenAI
        const systemInstruction = getWebSearchSystemInstruction(results, language || 'English', isDeepSearch);
        const userPrompt = `Based on these search results, answer: ${query}`;

        const result = await openaiService.generateContent(userPrompt, 'gpt-4.1', {
            system: systemInstruction
        });

        await logUsage(req.user?.id || 'admin', 'tool-openai-search', result.usage?.total_tokens, 'Real Time Web Search');

        res.status(200).json({
            success: true,
            data: result.content,
            results: results.snippets
        });
    } catch (error) {
        next(error);
    }
};

export const professionalTranslator = async (req, res, next) => {
    try {
        const { text, targetLanguage, tone = 'Professional' } = req.body;
        if (!text || !targetLanguage) return res.status(400).json({ success: false, message: 'Text and target language required' });

        const systemInstruction = `You are a professional translator. Translate the following text into ${targetLanguage} while strictly maintaining a ${tone} tone. Ensure linguistic accuracy and cultural context.`;
        const result = await openaiService.generateContent(text, 'gpt-4.1', { system: systemInstruction });

        await logUsage(req.user?.id || 'admin', 'tool-openai-translator', result.usage?.total_tokens, 'Professional Language Translator');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};

export const structuredDataExtractor = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ success: false, message: 'Text content required' });

        const systemInstruction = `You are a data extraction expert. Parse the following unstructured text and extract all important entities (Names, Dates, Organizations, Locations, Prices, and Action Items). Format the output as a clean, structured JSON object.`;
        const result = await openaiService.generateContent(text, 'gpt-4.1', { system: systemInstruction });

        await logUsage(req.user?.id || 'admin', 'tool-openai-extractor', result.usage?.total_tokens, 'Structured Data Extractor');
        res.status(200).json({ success: true, data: result.content });
    } catch (error) {
        next(error);
    }
};
