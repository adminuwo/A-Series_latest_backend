import * as aiwriteService from '../services/aiwriteService.js';
import AIWriteHistory from '../models/AIWriteHistory.js';
import AIWriteCalendar from '../models/AIWriteCalendar.js';
import UsageTracking from '../models/UsageTracking.js';
import userModel from '../models/User.js';
import fs from 'fs';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const debugLog = (msg) => {
    const logMsg = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync('aiwrite_debug.log', logMsg);
    console.log(msg);
};

export const handleGenerate = async (req, res) => {
    let { segment, type, inputs, mode } = req.body;

    // Parse inputs if they come as string (FormData)
    let safeInputs = inputs;
    if (typeof inputs === 'string') {
        try {
            safeInputs = JSON.parse(inputs);
        } catch (e) {
            safeInputs = {};
        }
    }

    segment = (segment || 'agencies').toLowerCase();
    type = (type || 'daily_ideas').toLowerCase();
    safeInputs = safeInputs || {};
    const userId = req.user.id;
    debugLog(`[AIWRITE_REQUEST_RECEIVED] Segment: ${segment}, Type: ${type}`);

    // Create a timeout promise to prevent indefinite hanging (90s limit)
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("GATEWAY_TIMEOUT: AISA Engine took too long (90s) to respond.")), 90000)
    );

    try {
        // 1. Check Usage Limits (SaaS Subscription Logic)
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const usage = await UsageTracking.findOne({
            userId,
            date: today,
            feature: 'aiwrite'
        });

        // 10 generations for Basic users as per prompt (Pro/King have unlimited)
        const limit = 10;
        if (usage && usage.count >= limit && user.plan === 'Basic') {
            return res.status(403).json({
                error: "Daily limit reached for Basic plan. Please upgrade to Pro for unlimited access."
            });
        }

        // 2. Generate Content with Race for Timeout
        debugLog(`[AIWRITE] Starting generation for ${segment} - ${type}`);

        let fileContent = "";
        if (type === 'manuscript_editor' && req.file) {
            debugLog(`[AIWRITE] Extracting text from uploaded file for manuscript editor...`);
            try {
                // Check if it's a local file (multer diskStorage) or a buffer (multer memoryStorage)
                const result = req.file.path
                    ? await mammoth.extractRawText({ path: req.file.path })
                    : await mammoth.extractRawText({ buffer: req.file.buffer });
                fileContent = result.value;
                safeInputs.manuscriptText = fileContent;
            } catch (err) {
                debugLog(`[AIWRITE] File extraction failed: ${err.message}`);
                return res.status(400).json({ error: "Failed to read document file. Ensure it is a valid .doc or .docx file." });
            }
        }

        debugLog(`[AIWRITE] Inputs: ${JSON.stringify(safeInputs)}`);

        let outputData = await Promise.race([
            aiwriteService.generateContent(segment, type, safeInputs, mode),
            timeoutPromise
        ]);

        // Special logic for Manuscript Editor: Generate edited DOCX
        if (type === 'manuscript_editor' && outputData.Edited_Segment) {
            debugLog(`[AIWRITE] Creating edited DOCX for manuscript editor...`);
            try {
                const paragraphs = outputData.Edited_Segment.split('\n').filter(p => p.trim());
                const doc = new Document({
                    sections: [{
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Manuscript Editing Report",
                                        bold: true,
                                        size: 28,
                                        font: "Arial"
                                    })
                                ],
                                spacing: { after: 400 }
                            }),
                            ...paragraphs.map(text => new Paragraph({
                                children: [
                                    new TextRun({
                                        text: text,
                                        font: "Arial",
                                        size: 24,
                                    })
                                ],
                                spacing: { after: 300 }
                            }))
                        ]
                    }]
                });
                const buffer = await Packer.toBuffer(doc);
                outputData.downloadUrl = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${buffer.toString('base64')}`;
                outputData.fileName = `Edited_Manuscript_${Date.now()}.docx`;
            } catch (docErr) {
                debugLog(`[AIWRITE] DOCX creation failed: ${docErr.message}`);
            }
        }

        debugLog(`[AIWRITE] Generation complete. Output size: ${JSON.stringify(outputData || {}).length} chars`);

        // 3. Save History
        debugLog(`[AIWRITE] Saving history...`);
        const historyEntry = await AIWriteHistory.create({
            userId,
            segment,
            type,
            inputData: safeInputs,
            outputData: outputData || { message: "No data generated" }
        });
        console.log(`[AIWRITE] History saved: ${historyEntry._id}`);

        // 4. Special Handling for Content Calendar / Refined Calendar
        if (segment === 'agencies' && (type === 'content_calendar' || type === 'advanced_refinement')) {
            try {
                const rawCalendar = outputData.calendar || outputData;
                const calendarData = Array.isArray(rawCalendar) ? rawCalendar : (Array.isArray(outputData) ? outputData : []);

                if (calendarData.length > 0) {
                    await AIWriteCalendar.create({
                        userId,
                        companyName: safeInputs.companyName,
                        month: safeInputs.month,
                        industry: safeInputs.industry,
                        targetAudience: safeInputs.targetAudience,
                        platforms: safeInputs.platforms,
                        calendarData: calendarData
                    });
                    console.log(`[AIWRITE] Successfully saved ${calendarData.length} days to calendar table.`);
                }
            } catch (dbErr) {
                console.warn("[AIWRITE DB WARNING] Failed to save to AIWriteCalendar table:", dbErr.message);
                // We don't throw here so the user still gets their generated content
            }
        }

        // 5. Update Usage Tracking
        try {
            await UsageTracking.findOneAndUpdate(
                { userId, date: today, feature: 'aiwrite' },
                { $inc: { count: 1 } },
                { upsert: true, new: true }
            );
        } catch (usageErr) {
            console.warn("[AIWRITE USAGE WARNING] Failed to update usage tracking:", usageErr.message);
        }

        res.status(200).json({
            success: true,
            data: outputData,
            historyId: historyEntry._id
        });
        debugLog(`[AIWRITE] Successfully sent response to client.`);

    } catch (error) {
        debugLog(`[AI_WRITE_CRITICAL_ERROR] ${error.message}`);
        console.error("=========================================");
        console.error("AIWRITE Controller CRITICAL ERROR:");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        console.error("=========================================");

        res.status(500).json({
            error: "Failed to generate content",
            details: error.message,
            debug: {
                project: process.env.GCP_PROJECT_ID,
                location: 'us-central1'
            },
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await AIWriteHistory.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
};
