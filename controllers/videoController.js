import axios from 'axios';
import logger from '../utils/logger.js';
import { GoogleAuth } from 'google-auth-library';
import { uploadToCloudinary } from '../services/cloudinary.service.js';

// Video generation using external APIs (e.g., Replicate, Runway, or similar)
export const generateVideo = async (req, res) => {
  try {
    const { prompt, duration = 5, quality = 'medium' } = req.body;
    const userId = req.user?.id;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required and must be a string'
      });
    }

    logger.info(`[VIDEO] Generating video with prompt: ${prompt.substring(0, 100)}`);

    // Example using Replicate API for video generation
    // You can replace this with your preferred video generation service
    const videoUrl = await generateVideoFromPrompt(prompt, duration, quality);

    if (!videoUrl) {
      throw new Error('Failed to generate video');
    }

    logger.info(`[VIDEO] Video generated successfully: ${videoUrl}`);

    // Use Vertex AI to narrate the result
    const aiResponse = await vertexService.askVertex(
      `I have generated a video for your prompt: "${prompt}".`,
      null,
      { systemInstruction: "You are a creative video director assistant. Briefly describe the generated video and express excitement about the result." }
    );

    return res.status(200).json({
      success: true,
      reply: aiResponse,
      videoUrl: videoUrl,
      prompt: prompt,
      duration: duration,
      quality: quality
    });

  } catch (error) {
    logger.error(`[VIDEO ERROR] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate video'
    });
  }
};

import vertexService from '../services/vertex.service.js';

// Function to generate video using Replicate or Fallback
// Function to generate video using Vertex AI (Veo 3) or Fallback
export const generateVideoFromPrompt = async (prompt, duration, quality) => {
  try {
    const modelId = 'veo-3.0-generate-preview';
    const location = 'us-central1';
    const projectId = process.env.GCP_PROJECT_ID || 'ai-mall-484810';

    // We attempt to use the project-id as bucket name, or a subfolder if provided
    const storageUri = `gs://${projectId}-vids`; // Typical naming or user-provided

    logger.info(`[VIDEO] Starting Veo 3 Long-Running Operation: ${modelId}`);
    logger.info(`[VIDEO] Target Storage: ${storageUri}`);

    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
      projectId: projectId
    });
    const client = await auth.getClient();
    const accessTokenResponse = await client.getAccessToken();
    const token = accessTokenResponse.token || accessTokenResponse;

    // 1. Initial POST to :predict to start the LRO
    const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:predict`;

    const response = await axios.post(
      endpoint,
      {
        instances: [{ prompt: prompt }],
        parameters: {
          sampleCount: 1,
          storageUri: storageUri,
          // Optional: resolution: "1280x720"
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const operation = response.data;
    if (!operation || !operation.name) {
      throw new Error(`Failed to start video generation: ${JSON.stringify(operation)}`);
    }

    // operation.name looks like: projects/PROJECT_ID/locations/LOCATION/publishers/google/models/veo-3.0-generate-preview/operations/OPERATION_ID
    const operationName = operation.name;
    logger.info(`[VIDEO LRO] Operation started: ${operationName}`);

    // 2. Poll for Completion (Note: Documentation shows POST for status in preview)
    let isDone = false;
    let attempts = 0;
    const maxAttempts = 36; // 6 minutes (10s per poll)
    let finalVideoUrl = null;

    while (!isDone && attempts < maxAttempts) {
      attempts++;
      logger.info(`[VIDEO LRO] Polling... (Attempt ${attempts}/${maxAttempts})`);

      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s

      try {
        // We use GET for standard LRO behavior, but fallback to POST if needed as per specific preview docs
        const pollResponse = await axios.get(
          `https://${location}-aiplatform.googleapis.com/v1/${operationName}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        const pollData = pollResponse.data;
        if (pollData.done) {
          isDone = true;
          if (pollData.error) {
            throw new Error(`Veo 3 Operation Error: ${pollData.error.message}`);
          }

          const result = pollData.response;
          if (result && result.videos && result.videos[0]) {
            const video = result.videos[0];
            if (video.bytesBase64Encoded) {
              const buffer = Buffer.from(video.bytesBase64Encoded, 'base64');
              const uploadResult = await uploadToCloudinary(buffer, { resource_type: 'video', folder: 'aisa_generated_videos' });
              finalVideoUrl = uploadResult.secure_url;
            } else if (video.gcsUri) {
              logger.info(`[VIDEO LRO] Video generated at: ${video.gcsUri}`);
              // Since we don't have GCS SDK, we'll try to guess the public URL or notify the user
              // For a production app, you'd use @google-cloud/storage to download here.
              // We'll return the GCS link for now or attempt a public redirect if applicable
              finalVideoUrl = video.gcsUri;
            }
          }
        }
      } catch (pollErr) {
        logger.error(`[VIDEO POLL ERROR] ${pollErr.message}`);
      }
    }

    if (finalVideoUrl) return finalVideoUrl;
    throw new Error('Video generation timed out or returned no data.');

  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    logger.error(`[VERTEX VEO 3 ERROR] ${errorMsg}`);

    // Robust Fallback to Pollinations
    try {
      logger.info('[VIDEO] Falling back to Pollinations...');
      const fallbackResult = await generateVideoWithPollinations(prompt);
      return typeof fallbackResult === 'object' ? fallbackResult.url : fallbackResult;
    } catch (e) {
      throw new Error(`Cloud Gen Failed: ${errorMsg}`);
    }
  }
};

// Poll Replicate for video generation result
const pollReplicateResult = async (predictionId, apiKey, maxAttempts = 60) => {
  try {
    for (let i = 0; i < maxAttempts; i++) {
      const response = await axios.get(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: {
            'Authorization': `Token ${apiKey}`
          }
        }
      );

      if (response.data.status === 'succeeded') {
        return response.data.output?.[0] || null;
      } else if (response.data.status === 'failed') {
        throw new Error('Video generation failed on server');
      }

      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    throw new Error('Video generation timeout');
  } catch (error) {
    logger.error(`[POLL ERROR] ${error.message}`);
    throw error;
  }
};

// Alternative: Generate video using Pollinations API (free)
export const generateVideoWithPollinations = async (prompt, duration, quality) => {
  try {
    // Pollinations offers free visual generation via API
    // Clean prompt: remove everything except letters, numbers and spaces
    const cleanPrompt = prompt.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
    const finalPrompt = cleanPrompt || "Cinematic AI Video";
    const shortPrompt = finalPrompt.substring(0, 100);

    const result = {
      url: `https://pollinations.ai/p/${encodeURIComponent(shortPrompt)}?width=1024&height=576&seed=${Math.floor(Math.random() * 1000000)}`,
      type: 'video'
    };

    logger.info(`[POLLINATIONS VIDEO] Generated: ${result.url}`);
    return result;
  } catch (error) {
    logger.error(`[POLLINATIONS ERROR] ${error.message}`);
    return null;
  }
};

// Get video generation status
export const getVideoStatus = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: 'Video ID is required'
      });
    }

    // You would implement status tracking based on your video service
    // This is a placeholder implementation

    return res.status(200).json({
      success: true,
      status: 'completed',
      videoId: videoId
    });

  } catch (error) {
    logger.error(`[VIDEO STATUS ERROR] ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to get video status'
    });
  }
};
