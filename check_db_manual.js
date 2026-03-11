import mongoose from 'mongoose';
import 'dotenv/config';

// Hardcoded URI from .env to be 100% sure
const MONGO_URI = 'mongodb+srv://a-series:aseris@cluster0.g4bporx.mongodb.net/a-series';

async function check() {
    try {
        console.log("Connecting manually...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        const Agent = mongoose.connection.db.collection('agents');
        const codeWriter = await Agent.findOne({ slug: 'tool-code-writer' });

        if (codeWriter) {
            console.log("FOUND AGENT:");
            console.log("Name:", codeWriter.agentName);
            console.log("Description:", codeWriter.description);
            console.log("Status:", codeWriter.status);
            console.log("Category:", codeWriter.category);
        } else {
            console.log("AGENT NOT FOUND (slug: tool-code-writer)");
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error("ERROR:", err);
    }
}

check();
