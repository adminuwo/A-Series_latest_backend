import mongoose from 'mongoose';
import 'dotenv/config';
import { seedTools } from './utils/seedTools.js';
import connectDB from './config/db.js';

async function runSeed() {
    try {
        console.log("--- MANUAL SEED START ---");
        await connectDB();
        console.log("DB Connected. Seeding...");
        await seedTools();
        console.log("--- MANUAL SEED FINISHED ---");
        process.exit(0);
    } catch (err) {
        console.error("--- SEED ERROR ---", err);
        process.exit(1);
    }
}

runSeed();
