import OpenAI from 'openai';
import { getOpenAIInstance } from '../config/openai.js';
import logger from '../utils/logger.js';

class OpenAIService {
    constructor() {
        this.MODEL_MAPPING = {
            'gpt-4.1': 'gpt-4o',
            'gpt-4.1-mini': 'gpt-4o-mini',
            'gpt-image-1': 'dall-e-3',
            'gpt-image-pro': 'dall-e-3',
            'gpt-image-standard': 'dall-e-3',
            'gpt-image-1.5': 'dall-e-3',
            'gpt-image-1-mini': 'dall-e-2',
            'gpt-4o-mini-tts': 'tts-1',
            'gpt-4o-transcribe': 'whisper-1',
            'gpt-video-1': 'sora-2',
            'gpt-video-1.5': 'sora-2-pro',
            'gpt-video-2': 'sora-2-pro',
            'gpt-search-preview': 'gpt-4o-search-preview',
            'gpt-search-pro': 'gpt-4o',
            'gpt-search-mini': 'gpt-4o-mini',
            'gpt-search-realtime': 'gpt-4o-realtime-preview'
        };
    }

    async generateContent(prompt, modelKey = 'gpt-4.1', options = {}) {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'gpt-4o';
        logger.info(`[OPENAI] Requesting content generation with model: ${model}`);

        const messages = [];
        if (options.system) {
            messages.push({ role: "system", content: options.system });
            delete options.system;
        }
        messages.push({ role: "user", content: prompt });

        const response = await openai.chat.completions.create({
            model: model,
            messages: messages,
            ...options
        });

        return {
            content: response.choices[0].message.content,
            usage: response.usage
        };
    }

    async generateImage(prompt, modelKey = 'gpt-image-1') {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'dall-e-3';
        logger.info(`[OPENAI] Requesting image generation with model: ${model}`);

        const response = await openai.images.generate({
            model: model,
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        return response.data[0].url;
    }

    async generateImageEdit(prompt, imageBuffer, modelKey = 'gpt-image-1.5') {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'dall-e-2';
        logger.info(`[OPENAI] Requesting image edit with model: ${model}`);

        // Image editing requires a valid square PNG file < 4MB
        const response = await openai.images.edit({
            model: model,
            image: await OpenAI.toFile(imageBuffer, "image.png"),
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        return response.data[0].url;
    }

    async textToSpeech(text, modelKey = 'gpt-4o-mini-tts') {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'tts-1';
        logger.info(`[OPENAI] Requesting TTS with model: ${model}`);

        const mp3 = await openai.audio.speech.create({
            model: model,
            voice: "alloy",
            input: text,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        return buffer;
    }

    async speechToText(fileBuffer, modelKey = 'gpt-4o-transcribe') {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'whisper-1';
        logger.info(`[OPENAI] Requesting STT with model: ${model}`);

        // Whisper requires a file object with a name
        const transcription = await openai.audio.transcriptions.create({
            file: await OpenAI.toFile(fileBuffer, "audio.mp3"),
            model: model,
        });

        return transcription.text;
    }

    async visionAnalysis(imageUrl, prompt, modelKey = 'gpt-4.1') {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'gpt-4o';
        logger.info(`[OPENAI] Requesting vision analysis with model: ${model}`);

        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        {
                            type: "image_url",
                            image_url: {
                                "url": imageUrl,
                            },
                        },
                    ],
                },
            ],
        });

        return {
            content: response.choices[0].message.content,
            usage: response.usage
        };
    }

    async generateVideo(prompt, modelKey = 'gpt-video-1') {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        const model = this.MODEL_MAPPING[modelKey] || 'sora-2-pro';
        logger.info(`[OPENAI] Requesting video generation with model: ${model}`);

        // Video generation (Sora) typically involves an async process. 
        // For now, we provide the architectural hook.
        throw new Error("OpenAI Sora-2-Pro video generation is currently in limited release. API integration will be activated once your OpenAI account has been granted access.");
    }

    async generateEmbeddings(text) {
        const openai = getOpenAIInstance();
        if (!openai) throw new Error("OpenAI not initialized");

        logger.info(`[OPENAI] Requesting embeddings for text: ${text.substring(0, 50)}...`);
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
            encoding_format: "float",
        });

        return response.data[0].embedding;
    }
}

export default new OpenAIService();
