import Conversation from "../models/Conversation.js";
import { generativeModel, genAIInstance as genAI, modelName } from "../config/vertex.js";
import mongoose from "mongoose";

// Standard Enterprise Model Config - Use the central modelName (gemini-2.0-flash-001) as per user requirement
const bizModel = genAI.getGenerativeModel({
    model: modelName,
});

/* ------------------ Generate + Save ------------------ */
export const generateDocument = async (req, res) => {
    try {
        const {
            businessName = "",
            idea = "",
            industry = "",
            targetAudience = "",
            tone = "formal",
            docType = "business_plan",
            extraNotes = "",
        } = req.body;

        if (!businessName && !idea) {
            return res.status(400).json({
                success: false,
                error: "businessName or idea is required",
            });
        }

        /* -------- Document Sections -------- */
        let docLabel = "BUSINESS PLAN";
        let sections = `
- Executive Summary
- Problem & Solution
- Market Overview
- Target Customer
- Business Model
- Go-To-Market Strategy
- Operations
- Revenue Streams
- KPIs & Metrics
- Roadmap
`;

        if (docType === "pitch_deck") {
            docLabel = "PITCH DECK";
            sections = `
- Vision
- Problem
- Solution
- Market Size
- Business Model
- Traction
- Go-To-Market
- Competition
- Team
- Ask
`;
        } else if (docType === "strategy") {
            docLabel = "STRATEGY DOCUMENT";
            sections = `
- Current Situation
- Vision
- Strategic Pillars
- Marketing
- Sales
- Execution
- KPIs
- Risks
`;
        }

        /* -------- Prompt -------- */
        const prompt = `
You are AIBIZ, a senior startup & business strategy consultant.

Create a detailed ${docLabel}.

Business Name: ${businessName}
Idea: ${idea}
Industry: ${industry}
Target Audience: ${targetAudience}
Tone: ${tone}
Extra Notes: ${extraNotes}

Follow this structure:
${sections}
`;

        const result = await bizModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(500).json({
                success: false,
                error: "No content generated",
            });
        }

        /* -------- SAVE TO CONVERSATION -------- */
        const saved = await Conversation.create({
            userId: req.user ? req.user.id : 'admin',
            title: `${docLabel}: ${businessName || idea.substring(0, 20)}`,
            agentType: 'AIBIZ',
            messages: [
                { role: 'user', content: `Generate ${docLabel} for ${businessName}\nIdea: ${idea}` },
                { role: 'assistant', content: text }
            ],
            sessionId: `aibiz_${Date.now()}`
        });

        console.log(`✅ Document saved: ${saved._id}`);

        res.json({
            success: true,
            data: {
                document: text,
                id: saved._id,
            },
        });
    } catch (err) {
        console.error("❌ AIBIZ error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to generate document",
        });
    }
};

/* ------------------ CRM Analysis ------------------ */
export const analyzeCRM = async (req, res) => {
    try {
        const { customer, interactions, promptOverride } = req.body;

        const prompt = promptOverride || `
        Analyze CRM data for ${customer.name}.
        Industry: ${customer.industry}
        Interaction History:
        ${interactions.map(i => `- ${i.date}: ${i.subject} (${i.sentiment})`).join('\n')}

        Provide:
        1. Churn Risk Assessment
        2. Upsell Opportunities
        3. Suggested Response Draft
        4. Health Trend Data for chart (JSON)
        `;

        const result = await bizModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        res.json({
            success: true,
            data: {
                analysis: text
            }
        });
    } catch (err) {
        console.error("❌ CRM Analysis error:", err);
        res.status(500).json({ success: false, error: "Failed to analyze CRM data" });
    }
};

/* ------------------ Lead Scoring ------------------ */
export const scoreLead = async (req, res) => {
    try {
        const { leadData } = req.body;

        const prompt = `
        Act as an AI Lead Scoring Agent. 
        Analyze the following lead data:
        Lead Name: ${leadData.name}
        Frequency: ${leadData.frequency}
        Email Opens: ${leadData.opens}%
        Website Visits: ${leadData.visits}
        Industry: ${leadData.industry}
        Budget: ${leadData.budget}
        Engagement: ${leadData.engagement || 'Medium'}

        Calculate a score (0-100) and priority (Hot, Warm, Cold).
        Provide a concise reason for the score.

        MANDATORY JSON OUTPUT:
        {
          "score": number,
          "priority": "Hot" | "Warm" | "Cold",
          "reason": "string"
        }
        `;

        const result = await bizModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Extract JSON if AI wrapped it in markdown
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const scoring = jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 0, priority: 'Cold', reason: 'Failed to parse' };

        res.json({
            success: true,
            data: scoring
        });
    } catch (err) {
        console.error("❌ Lead Scoring error:", err);
        res.status(500).json({ success: false, error: "Failed to score lead" });
    }
};

/* ------------------ Customer Segmentation ------------------ */
export const segmentCustomers = async (req, res) => {
    try {
        const { userData } = req.body;

        const prompt = `
        Act as a SaaS Growth Strategist.
        Analyze this batch of user data for behavioral segmentation:
        ${JSON.stringify(userData)}

        Tasks:
        1. Apply RFM (Recency, Frequency, Monetary) clustering.
        2. Generate 4 distinct AI personas based on behavior.
        3. Identify "At-Risk" and "High-Value" clusters.
        4. Provide strategic recommendations for each segment.

        MANDATORY JSON OUTPUT:
        {
          "segments": [
            {
              "name": "string",
              "rfm": "string (e.g. 5-5-5)",
              "count": number,
              "persona": "string",
              "behavior": "string",
              "details": "string",
              "color": "hex"
            }
          ],
          "ai_insight": "string"
        }
        `;

        const result = await bizModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const segmentation = jsonMatch ? JSON.parse(jsonMatch[0]) : { segments: [], ai_insight: 'Analysis failed' };

        res.json({
            success: true,
            data: segmentation
        });
    } catch (err) {
        console.error("❌ Segmentation error:", err);
        res.status(500).json({ success: false, error: "Failed to segment customers" });
    }
};

/* ------------------ Campaign Generation ------------------ */
export const generateCampaign = async (req, res) => {
    try {
        const { segment, goal, channel } = req.body;

        const prompt = `
        Act as a Direct Response Marketer & AI Copywriter.
        Target Segment: ${segment.name}
        Core Behavior: ${segment.behavior}
        Campaign Goal: ${goal}
        Channel: ${channel}

        Tasks:
        1. Generate a high-converting Subject Line (for Email) or Hook (for WhatsApp).
        2. Create 2 A/B Variants (Variant A: Direct Benefit, Variant B: Scarcity/FOMO).
        3. Provide 3 CTA suggestions.
        4. Recommend the 'Best Send Time' based on typical ${segment.persona} behavior.
        5. Predict CTR for each variant.

        MANDATORY JSON OUTPUT:
        {
          "subject": "string",
          "variants": [
            { "id": "A", "body": "string", "ctr": "string" },
            { "id": "B", "body": "string", "ctr": "string" }
          ],
          "ctas": ["string", "string", "string"],
          "best_send_time": "string",
          "ai_logic": "string"
        }
        `;

        const result = await bizModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const campaign = jsonMatch ? JSON.parse(jsonMatch[0]) : { subject: 'Failed to generate', variants: [] };

        res.json({
            success: true,
            data: campaign
        });
    } catch (err) {
        console.error("❌ Campaign Generation error:", err);
        res.status(500).json({ success: false, error: "Failed to generate campaign" });
    }
};

/* ------------------ FETCH HISTORY ------------------ */
export const getHistory = async (req, res) => {
    try {
        // If authenticated, we could filter by user. For now returning all or per user preference.
        // Adapting AIBIZ original behavior (all history) but respecting user isolation if possible.
        // For now, let's keep it simple and return all like original, or filter if userId is present?
        // The original AIBIZ didn't have auth. The AI-MALL has auth.
        // To be safe and consistent with "AI-Mall", we should probably only show the user's history?
        // But the requirements said "add AIBIZ agent... updated version".
        // Let's filter by userId if req.user exists, otherwise return empty or all?
        // Given usage of verifyToken in routes, we will have req.user.

        const query = { agentType: 'AIBIZ' };
        if (req.user) {
            query.userId = req.user.id;
        }

        const history = await Conversation.find(query).sort({ createdAt: -1 });
        console.log(`📋 Fetched ${history.length} documents from history`);
        res.json(history);
    } catch (err) {
        console.error("❌ Error fetching history:", err);
        res.status(500).json({ error: "Failed to fetch history" });
    }
};

/* ------------------ DELETE HISTORY ------------------ */
export const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("🗑️  DELETE request received for ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid document ID format"
            });
        }

        // Ensure user owns the document if authenticated
        const query = { _id: id };
        if (req.user) {
            query.userId = req.user.id;
        }

        const deletedDoc = await Conversation.findOneAndDelete(query);

        if (!deletedDoc) {
            return res.status(404).json({
                success: false,
                error: "Document not found or access denied"
            });
        }

        console.log("✅ Document deleted successfully:", id);

        res.status(200).json({
            success: true,
            message: "Document deleted successfully",
            deletedId: id
        });

    } catch (err) {
        console.error("❌ Delete error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to delete document",
            details: err.message
        });
    }
};
