import OpenAI from 'openai';
import { getOpenAIInstance } from '../config/openai.js';
import logger from '../utils/logger.js';

class OpenAIService {
    constructor() {
        this.MODEL_MAPPING = {
            'gpt-4.1': 'gpt-4o',
            'gpt-4.1-mini': 'gpt-4o-mini',
            'gpt-image-1': 'dall-e-3',
            'gpt-4o-mini-tts': 'tts-1',
            'gpt-4o-transcribe': 'whisper-1'
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
}

export default new OpenAIService();
