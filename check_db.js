import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;

const AgentSchema = new mongoose.Schema({
    agentName: String,
    slug: { type: String, unique: true },
    description: String,
    status: String
}, { strict: false });

const Agent = mongoose.models.Agents || mongoose.model('Agents', AgentSchema);

async function check() {
    try {
        console.log("Connecting to:", MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        const codeWriter = await Agent.findOne({ slug: 'tool-code-writer' });
        if (codeWriter) {
            console.log("FOUND AGENT:");
            console.log("Name:", codeWriter.agentName);
            console.log("Description:", codeWriter.description);
            console.log("Status:", codeWriter.status);
        } else {
            console.log("AGENT NOT FOUND (slug: tool-code-writer)");
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error("ERROR:", err);
    }
}

check();
