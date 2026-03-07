import HealthData from '../models/HealthData.js';
import HealthAutomation from '../models/HealthAutomation.js';
import PersonalTask from '../models/PersonalTask.js';
import vertexService from './vertex.service.js';

/**
 * AI Decision Engine for Health Automation
 * Logic: Detect -> Decide -> Act
 */
export const runHealthMonitoringAudit = async (userId) => {
    try {
        // Get latest health data (last 24-48 hours)
        const recentData = await HealthData.find({ userId }).sort({ date: -1 }).limit(2);
        if (!recentData.length) return;

        const latest = recentData[0];
        const newEvents = [];

        // 1. Basic Threshold Logic (IF -> Then)

        // Sleep Logic
        if (latest.sleepHours > 0 && latest.sleepHours < 6) {
            newEvents.push({
                userId,
                type: 'Alert',
                category: 'Monitoring',
                message: `Fatigue Alert: You only slept ${latest.sleepHours}h. High risk of low cognitive performance today.`,
                severity: 'Medium'
            });
        }

        // Water Logic
        if (latest.waterIntake > 0 && latest.waterIntake < 2) {
            newEvents.push({
                userId,
                type: 'Action',
                category: 'Reminder',
                message: `Hydration Reminder: Current intake ${latest.waterIntake}L is below 2L threshold. Sending nudge.`,
                severity: 'Low'
            });
        }

        // Steps Logic
        if (latest.steps > 0 && latest.steps < 5000) {
            newEvents.push({
                userId,
                type: 'Detection',
                category: 'Monitoring',
                message: `Sedentary behavior detected (${latest.steps} steps). Suggesting a 10-minute walk.`,
                severity: 'Low'
            });
        }

        // 2. Complex Pattern Detection (AI Driven)
        await detectRisks(userId, recentData, newEvents);

        // Save new events to DB
        if (newEvents.length > 0) {
            await HealthAutomation.insertMany(newEvents);
        }

        return newEvents;
    } catch (error) {
        console.error("Health Monitoring Audit Error:", error);
    }
};

const detectRisks = async (userId, history, events) => {
    if (history.length < 2) return;

    const current = history[0];
    const previous = history[1];

    // Pattern: BMI rising + sleep dropping
    if (current.bmi > previous.bmi && current.sleepHours < previous.sleepHours) {
        events.push({
            userId,
            type: 'Decision',
            category: 'Risk',
            message: `Lifestyle Disorder Risk Detected: BMI is trending up (${current.bmi}) while sleep is declining. Auto-scheduling routine adjustment.`,
            severity: 'High'
        });
    }

    // Pattern: Stress high + sleep low
    if (current.stressLevel > 7 && current.sleepHours < 6) {
        events.push({
            userId,
            type: 'Alert',
            category: 'Risk',
            message: `Burnout Predictor: Critical combination of high stress (${current.stressLevel}/10) and chronic sleep debt.`,
            severity: 'High'
        });
    }
};

export const generateAutoRoutine = async (userId) => {
    try {
        const latestData = await HealthData.findOne({ userId }).sort({ date: -1 });
        if (!latestData) return null;

        const prompt = `Act as AI-HEALTH AUTO ROUTINE GENERATOR.
        USER PROFILE: Sleep ${latestData.sleepHours}h, Stress ${latestData.stressLevel}/10, Water ${latestData.waterIntake}L, Steps ${latestData.steps}.
        GOAL: Build a recovery routine for tomorrow based on these behavior signals.
        
        MANDATORY JSON FORMAT:
        {
            "routineName": "string",
            "schedule": [
                {"time": "8:00 AM", "activity": "Sunlight Exposure", "reason": "Circadian reset for better sleep tonight"},
                {"time": "2:00 PM", "activity": "Caffeine Cutoff", "reason": "Deep sleep optimization"}
            ],
            "topPriority": "string"
        }`;

        const result = await vertexService.askVertex(prompt, null, { agentType: 'AIHEALTH' });
        const cleanJson = result.replace(/```json|```/g, '').trim();
        const routine = JSON.parse(cleanJson);

        // SYNC TO PERSONAL ASSISTANT: Create tasks for each activity in the routine
        try {
            for (const item of routine.schedule) {
                // Parse "8:00 AM" to Date object
                const timeMatch = item.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
                if (timeMatch) {
                    let hours = parseInt(timeMatch[1]);
                    const minutes = parseInt(timeMatch[2]);
                    const period = timeMatch[3].toUpperCase();

                    if (period === 'PM' && hours !== 12) hours += 12;
                    if (period === 'AM' && hours === 12) hours = 0;

                    const taskDate = new Date();
                    taskDate.setDate(taskDate.getDate() + 1); // Set for tomorrow
                    taskDate.setHours(hours, minutes, 0, 0);

                    await PersonalTask.create({
                        userId,
                        title: `Health: ${item.activity}`,
                        description: item.reason,
                        category: 'Health',
                        datetime: taskDate,
                        recurring: 'none'
                    });
                }
            }
            console.log(`[AIHEALTH SYNC] Successfully synced ${routine.schedule.length} tasks to Personal Assistant for user ${userId}`);
        } catch (syncError) {
            console.error("Failed to sync health routine to Personal Assistant:", syncError);
        }

        await HealthAutomation.create({
            userId,
            type: 'Action',
            category: 'Routine',
            message: `Personalized ${routine.routineName} generated automatically based on your latest vitals. Tasks synced to Personal Assistant.`,
            metadata: routine
        });

        return routine;
    } catch (error) {
        console.error("Auto Routine Error:", error);
    }
};

export const updateHealthScores = async (userId) => {
    try {
        const history = await HealthData.find({ userId }).sort({ date: -1 }).limit(7);
        // Simple heuristic for score calculation
        let healthScore = 70; // Baseline

        if (history.length > 0) {
            const avgSleep = history.reduce((acc, d) => acc + d.sleepHours, 0) / history.length;
            const avgSteps = history.reduce((acc, d) => acc + d.steps, 0) / history.length;

            if (avgSleep > 7) healthScore += 10;
            if (avgSteps > 8000) healthScore += 10;
            if (avgSleep < 5) healthScore -= 15;
        }

        await HealthAutomation.create({
            userId,
            type: 'Decision',
            category: 'ScoreUpdate',
            message: `Nightly Score Recalculation Complete. New Health Score: ${healthScore}%. Tracking trend vs last 7 days.`,
            severity: 'Low',
            metadata: { healthScore }
        });

        return healthScore;
    } catch (error) {
        console.error("Score Update Error:", error);
    }
};
