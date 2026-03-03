import mongoose from 'mongoose';
import dns from 'dns';
<<<<<<< HEAD
=======
dns.setDefaultResultOrder('ipv4first');

>>>>>>> ae32634a141c28c68e55eb8bf1a7edbf0cdfbebf
import { MONGO_URI } from './env.js';
import logger from '../utils/logger.js';

// Use Google DNS to resolve MongoDB SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log("MONGO_URI", MONGO_URI);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 to resolve the querySrv ECONNREFUSED error
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
