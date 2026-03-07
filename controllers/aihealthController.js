import vertexService from '../services/vertex.service.js';
import HealthData from '../models/HealthData.js';
import HealthAutomation from '../models/HealthAutomation.js';
import * as automationService from '../services/automationService.js';

export const symptomCheck = async (req, res) => {
    const { symptoms, duration, severity, treatmentType } = req.body;

    try {
        const prompt = `Analyze the following symptoms for a health intelligence report:
Symptoms: ${symptoms}
Duration: ${duration}
Severity: ${severity}
Preferred Treatment Style: ${treatmentType}

Return ONLY a perfectly formatted JSON response (no markdown, no extra text) with the following structure:
{
  "possibleCauses": ["list of 3-4 likely causes based on the symptoms"],
  "riskLevel": "Low" | "Medium" | "High",
  "recommendations": ["list of 3-4 actionable advice points"],
  "doctorAdvice": "Short professional legal disclaimer and advice on when to seek immediate medical help"
}
Important: Construct the analysis based on the "${treatmentType}" framework while maintaining medical safety standards.`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });

        // Parse result
        let responseData;
        try {
            // Remove potential markdown wrappers
            const cleanJson = result.replace(/```json|```/g, '').trim();
            responseData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse LLM response for aihealth:", e);
            // Robust fallback if JSON is malformed
            responseData = {
                possibleCauses: ["Inconclusive analysis - symptoms require human check-up"],
                riskLevel: "Medium",
                recommendations: ["Stay hydrated", "Monitor symptoms for changes", "Log symptom patterns for a doctor"],
                doctorAdvice: "The system encountered an error parsing the AI analysis. Please consult a healthcare professional immediately if symptoms persist or worsen."
            };
        }

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error("AIHEALTH Controller Error:", error);
        res.status(500).json({ error: "Symptom check failed. Please try again." });
    }
};

import * as pdfAnalysisService from '../services/pdfAnalysisService.js';

export const reportAnalysis = async (req, res) => {
    try {
        let contextText = "";
        const manualValues = req.body.manualValues ? JSON.parse(req.body.manualValues) : {};

        // 1. Handle PDF Extract if file exists
        if (req.file) {
            // If using multer with storage, req.file.buffer or req.file.path
            // uploadMiddleware uses cloudinary/multer. If it's single('file'), req.file.buffer should be available if MemoryStorage is used.
            // Actuallycloudinary service might be involved. 
            // In pdfRoutes it used uploadedFile.data which suggests express-fileupload. 
            // BUT server.js commented it out.
            // Let's assume req.file.buffer if using multer memory storage.
            if (req.file.buffer) {
                contextText = await pdfAnalysisService.extractTextFromBuffer(req.file.buffer);
            }
        }

        // 2. Build Prompt
        const prompt = `Analyze this Health Report.
Manual Values Provided: ${JSON.stringify(manualValues)}
Report Text Content: ${contextText.substring(0, 5000)}

Perform a professional health intelligence analysis. Identify any values outside normal ranges for:
- Glucose (Normal: 70-100 mg/dL fasting)
- Cholesterol (Normal: <200 mg/dL)
- Hemoglobin (Normal: 12-17 g/dL)
- BP (Normal: 120/80 mmHg)

Return ONLY a perfectly formatted JSON response (no markdown, no extra text) with the following structure:
{
  "abnormalFindings": [
    { "parameter": "Glucose", "value": "150", "unit": "mg/dL", "status": "High" }
  ],
  "explanation": "Summarized high-level explanation of the overall health risk based on these findings.",
  "dietSuggestions": ["3-4 specific dietary adjustments"],
  "lifestyleTips": ["3-4 actionable lifestyle changes"]
}
Ensure the explanation is professional but easy for a user to understand.`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });

        // Parse result
        let responseData;
        try {
            const cleanJson = result.replace(/```json|```/g, '').trim();
            responseData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse LLM response for report analysis:", e);
            responseData = {
                abnormalFindings: [],
                explanation: "We couldn't parse the detailed health values, but based on the report, you should consult a doctor regarding any flagged parameters.",
                dietSuggestions: ["Balanced diet", "Low sugar", "Rich in greens"],
                lifestyleTips: ["Regular exercise", "8 hours sleep", "Stress management"]
            };
        }

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error("AIHEALTH Report Analysis Error:", error);
        res.status(500).json({ error: "Report analysis failed. Please try again." });
    }
};

export const wellnessPlan = async (req, res) => {
    try {
        const { age, height, weight, goal, activityLevel, dietaryType, allergies, cuisine } = req.body;

        // 1. BMI Calculation
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

        // 2. Build Prompt
        const prompt = `Generate a Personalized Wellness Plan for:
Age: ${age}
Height: ${height}cm
Weight: ${weight}kg
Calculated BMI: ${bmi}
Goal: ${goal}
Activity Level: ${activityLevel}
Dietary Type: ${dietaryType}
Allergies: ${allergies || 'None'}
Preferred Cuisine: ${cuisine || 'Any'}

Return ONLY a perfectly formatted JSON response (no markdown, no extra text) with the following structure:
{
  "bmiAnalysis": "Short professional explanation of the BMI score",
  "dailyStats": {
    "calories": "Target daily calories",
    "water": "Daily water target in liters",
    "sleep": "Recommended sleep hours"
  },
  "mealPlan": [
    { "day": "Monday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." },
    { "day": "Tuesday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." },
    { "day": "Wednesday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." },
    { "day": "Thursday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." },
    { "day": "Friday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." },
    { "day": "Saturday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." },
    { "day": "Sunday", "breakfast": "...", "lunch": "...", "dinner": "...", "snack": "..." }
  ],
  "workoutSchedule": [
    { "day": "Monday", "activity": "...", "duration": "..." },
    { "day": "Tuesday", "activity": "...", "duration": "..." },
    { "day": "Wednesday", "activity": "Rest/Light activity", "duration": "..." },
    { "day": "Thursday", "activity": "...", "duration": "..." },
    { "day": "Friday", "activity": "...", "duration": "..." },
    { "day": "Saturday", "activity": "High Intensity/Yoga", "duration": "..." },
    { "day": "Sunday", "activity": "Rest", "duration": "..." }
  ],
  "progressMilestones": ["List of 3 short-term progress indicators"]
}
Important: Ensure the plan is holistic and tailored to the ${goal} goal.`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });

        // Parse result
        let responseData;
        try {
            const cleanJson = result.replace(/```json|```/g, '').trim();
            responseData = JSON.parse(cleanJson);
            responseData.bmiValue = bmi; // Inject calculated BMI
        } catch (e) {
            console.error("Failed to parse LLM response for wellness plan:", e);
            responseData = {
                bmiValue: bmi,
                bmiAnalysis: "BMI is in the normal range, but a balanced plan is recommended.",
                dailyStats: { calories: "2000 kcal", water: "2.5L", sleep: "8 Hours" },
                mealPlan: [],
                workoutSchedule: [],
                progressMilestones: ["Better sleep", "Increased energy", "Visible tone"]
            };
        }

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error("AIHEALTH Wellness Plan Error:", error);
        res.status(500).json({ error: "Wellness plan generation failed." });
    }
};

export const mentalSupport = async (req, res) => {
    try {
        const { mood, note } = req.body;

        const prompt = `Perform a compassionate sentiment analysis and provide mental wellness support for a user feeling: "${mood}".
User Note: "${note || 'No specific details provided.'}"

Return ONLY a perfectly formatted JSON response (no markdown, no extra text) with the following structure:
{
  "sentiment": "Brief empathetic analysis of their current emotional state",
  "breathingExercise": {
    "name": "Name of the exercise (e.g. Box Breathing)",
    "steps": ["Step 1...", "Step 2..."],
    "duration": "Duration in seconds for one cycle (e.g. 16)"
  },
  "affirmation": "A powerful, personalized positive affirmation",
  "actionSteps": ["3 immediate small actionable steps to feel better"],
  "supportColor": "Hex color code for a calming background (e.g. #f0f7ff)"
}
Important: Maintain a gentle, supportive, and non-judgmental tone.`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });

        let responseData;
        try {
            const cleanJson = result.replace(/```json|```/g, '').trim();
            responseData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse LLM response for mental support:", e);
            responseData = {
                sentiment: "You seem to be going through a lot right now. It's okay to feel this way.",
                breathingExercise: { name: "Deep Breathing", steps: ["Inhale slowly", "Hold", "Exhale slowly"], duration: "10" },
                affirmation: "I am safe, I am calm, and I am in control of my breath.",
                actionSteps: ["Drink a glass of water", "Stretch your body", "Look out the window"],
                supportColor: "#f0f7ff"
            };
        }

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error("AIHEALTH Mental Support Error:", error);
        res.status(500).json({ error: "Mental support generation failed." });
    }
};

export const treatmentGuide = async (req, res) => {
    try {
        const { medicineName, treatmentType, condition } = req.body;

        const prompt = `Provide a professional medicine and treatment guide for:
Medicine Name: ${medicineName || 'Not specified'}
Treatment Type: ${treatmentType}
Condition: ${condition || 'Not specified'}

Return ONLY a perfectly formatted JSON response (no markdown, no extra text) with the following structure:
{
  "purpose": "Precise explanation of what the medicine/treatment is for",
  "sideEffects": ["3-4 common side effects"],
  "precautions": ["3-4 mandatory precautions and safety warnings"],
  "alternatives": ["2-3 alternative options (e.g. Ayurvedic alternatives if medicine is allopathic)"],
  "safetyWarning": "High-priority safety alert or red flag to watch out for",
  "medicalDisclaimer": "Standard medical disclaimer that this is NOT professional medical advice and to consult a doctor."
}
System: ${treatmentType} framework. Ensure accuracy and safety.`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });

        let responseData;
        try {
            const cleanJson = result.replace(/```json|```/g, '').trim();
            responseData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse LLM response for treatment guide:", e);
            responseData = {
                purpose: "Could not fetch details.",
                sideEffects: ["Check label"],
                precautions: ["Consult doctor"],
                alternatives: [],
                safetyWarning: "Consult a licensed healthcare professional immediately.",
                medicalDisclaimer: "This AI response is for informational purposes only."
            };
        }

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error("AIHEALTH Treatment Guide Error:", error);
        res.status(500).json({ error: "Treatment guide generation failed." });
    }
};
export const logHealthData = async (req, res) => {
    try {
        const { sleepHours, waterIntake, steps, heartRate, weight, height, stressLevel, mood, notes } = req.body;
        const userId = req.user.id;

        const newEntry = await HealthData.create({
            userId,
            sleepHours,
            waterIntake,
            steps,
            heartRate,
            weight,
            height,
            stressLevel,
            mood,
            notes
        });

        // Immediately trigger a monitoring audit after manual log
        await automationService.runHealthMonitoringAudit(userId);

        res.status(201).json({
            success: true,
            message: "Health metrics logged and AI audit triggered.",
            data: newEntry
        });
    } catch (error) {
        console.error("Log Health Data Error:", error);
        res.status(500).json({ error: "Failed to log health data." });
    }
};

export const automationScan = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch recent logs and alerts from DB instead of just mock
        const logs = await HealthAutomation.find({ userId, type: { $ne: 'Alert' } }).sort({ timestamp: -1 }).limit(10);
        const alerts = await HealthAutomation.find({ userId, type: 'Alert' }).sort({ timestamp: -1 }).limit(5);

        // Get recent metrics for prompt context
        const metrics = await HealthData.find({ userId }).sort({ date: -1 }).limit(2);

        const prompt = `Perform an Autonomous Health Intelligence Scan.
USER METRICS: ${JSON.stringify(metrics)}
CURRENT SYSTEM LOGS: ${JSON.stringify(logs)}
ACTIVE ALERTS: ${JSON.stringify(alerts)}

DEFINITION:
- AI detects: Identifying anomalies or patterns in recent health data.
- AI decides: Determining the severity and necessary response.
- AI acts: Generating reminders, alerts, or scheduling analysis.

TASK:
1. Analyze the context and provide a summary.
2. If metrics indicate high risk (Sleep < 5h, Stress > 8), generate NEW events.

Return ONLY a perfectly formatted JSON response (no markdown, no extra text) with the following structure:
{
  "detections": "Concise summary",
  "decisions": "Concise summary",
  "actions": "Concise summary",
  "newLogs": [
    { "type": "Detection|Decision|Action", "message": "...", "time": "Just now", "severity": "Low|Medium|High" }
  ],
  "newAlerts": [
    { "title": "...", "message": "...", "date": "Today", "status": "unread" }
  ]
}
Return 2-3 new logs and 0-1 new alerts.`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });

        let responseData;
        try {
            const cleanJson = result.replace(/```json|```/g, '').trim();
            responseData = JSON.parse(cleanJson);

            // Save results to DB
            if (responseData.newLogs) {
                await HealthAutomation.insertMany(responseData.newLogs.map(l => ({ ...l, userId, timestamp: new Date() })));
            }
            if (responseData.newAlerts) {
                await HealthAutomation.insertMany(responseData.newAlerts.map(a => ({ ...a, userId, type: 'Alert', timestamp: new Date() })));
            }

        } catch (e) {
            console.error("Failed to parse LLM response for health automation:", e);
            responseData = {
                detections: "System scan complete.",
                decisions: "Monitoring active.",
                actions: "Data verified.",
                newLogs: logs,
                newAlerts: alerts
            };
        }

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        console.error("AIHEALTH Automation Error:", error);
        res.status(500).json({ error: "Health automation scan failed." });
    }
};
