import cron from 'node-cron';
import User from './models/User.js';
import * as automationService from './services/automationService.js';

/**
 * AIHEALTH Automation Scheduler
 */
export const initCronJobs = () => {
    console.log("🚀 Initializing AIHEALTH Automation Cron Jobs...");

    // 1. Monitoring & Risk Detection (Every 2 hours)
    // 0 */2 * * *
    cron.schedule('0 */2 * * *', async () => {
        console.log("⏱️ Running Bi-Hourly Health Monitoring Audit...");
        const users = await User.find({});
        for (const user of users) {
            await automationService.runHealthMonitoringAudit(user._id);
        }
    });

    // 2. Nightly Score Recalculation (11:59 PM every day)
    cron.schedule('59 23 * * *', async () => {
        console.log("🌙 Running Nightly Health Score Updates...");
        const users = await User.find({});
        for (const user of users) {
            await automationService.updateHealthScores(user._id);
            await automationService.generateAutoRoutine(user._id);
        }
    });

    // 3. Weekly Report Generator (Sunday 10:00 AM)
    cron.schedule('0 10 * * 0', async () => {
        console.log("📊 Generating Weekly Health Reports...");
        // Logic for weekly summary
    });
};
