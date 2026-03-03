import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import OpenAI from 'openai';
import 'dotenv/config';

const projectId = process.env.GCP_PROJECT_ID;
const secretName = 'OPENAI_API_KEY'; // User should ensure this secret exists in GCP

let openai;

async function getSecret(name) {
    if (process.env.NODE_ENV !== 'production' && process.env.OPENAI_API_KEY) {
        console.log("🔑 [OpenAI] Using API key from .env");
        return process.env.OPENAI_API_KEY;
    }

    try {
        const client = new SecretManagerServiceClient();
        const [version] = await client.accessSecretVersion({
            name: `projects/${projectId}/secrets/${name}/versions/latest`,
        });
        const payload = version.payload.data.toString();
        console.log("✅ [OpenAI] Fetched API key from GCP Secret Manager");
        return payload;
    } catch (error) {
        console.error("❌ [OpenAI] Failed to fetch secret from Secret Manager:", error.message);
        return process.env.OPENAI_API_KEY; // Fallback to .env
    }
}

export const initializeOpenAI = async () => {
    const apiKey = await getSecret(secretName);
    if (!apiKey) {
        console.warn("⚠️ [OpenAI] No API key found. OpenAI features will be disabled.");
        return null;
    }
    openai = new OpenAI({ apiKey });
    return openai;
};

export const getOpenAIInstance = () => openai;
