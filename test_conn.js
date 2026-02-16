import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = process.env.MONGODB_ATLAS_URI;

console.log("Testing connection to:", MONGO_URI);

async function test() {
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("SUCCESS: Connected to MongoDB");
        process.exit(0);
    } catch (err) {
        console.error("FAILURE: Connection failed");
        console.error(err);
        process.exit(1);
    }
}

test();
