import mongoose from 'mongoose';
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import { MONGO_URI } from './env.js';
import logger from '../utils/logger.js';

console.log("MONGO_URI", MONGO_URI);
const connectDB = async () => {
  try {
    // Attempt to override DNS servers to avoid ECONNREFUSED issues with local ISP resolvers
    try {
      dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
      logger.info("Custom DNS servers (Google/Cloudflare) configured for MongoDB handshake.");
    } catch (dnsErr) {
      logger.warn("Could not set custom DNS servers, continuing with system defaults.");
    }

    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 60000, // Increased to 60s
      socketTimeoutMS: 60000,
      family: 4,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
