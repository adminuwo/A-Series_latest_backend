import express from "express";
import { generateDocument, getHistory, deleteHistory, analyzeCRM, scoreLead, segmentCustomers, generateCampaign } from "../controllers/aibizController.js";
import { verifyToken } from "../middleware/authorization.js";

const router = express.Router();

// Apply verifyToken middleware to all routes to ensure user context
// Remove verifyToken if public access is desired, but AI-Mall seems auth-based.
router.post("/", verifyToken, generateDocument);
router.post("/analyze-crm", verifyToken, analyzeCRM);
router.post("/score-lead", verifyToken, scoreLead);
router.post("/segment-customers", verifyToken, segmentCustomers);
router.post("/generate-campaign", verifyToken, generateCampaign);
router.get("/history", verifyToken, getHistory);
router.delete("/history/:id", verifyToken, deleteHistory);

export default router;
