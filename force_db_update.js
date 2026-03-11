import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = 'mongodb+srv://a-series:aseris@cluster0.g4bporx.mongodb.net/a-series';

async function updateCodeWriter() {
    try {
        console.log("Connecting to Atlas...");
        await mongoose.connect(MONGO_URI);
        console.log("Connected.");

        const Agent = mongoose.connection.db.collection('agents');

        const newDesc = "AI Code Writer is an intelligent development assistant that helps developers generate, debug, and optimize code across multiple programming languages.";
        const newFullDesc = "AI Code Writer is an intelligent development assistant that helps developers generate, debug, and optimize code across multiple programming languages.\n\nPowered by Google Vertex AI (Gemini 1.5 Pro).";

        const result = await Agent.updateMany(
            { agentName: /AI Code Writer/i },
            {
                $set: {
                    description: newDesc,
                    fullDesc: newFullDesc
                }
            }
        );

        console.log(`Matched ${result.matchedCount} documents.`);
        console.log(`Modified ${result.modifiedCount} documents.`);

        const updated = await Agent.findOne({ agentName: /AI Code Writer/i });
        if (updated) {
            console.log("VERIFICATION:");
            console.log("Name:", updated.agentName);
            console.log("FullDesc:", updated.fullDesc);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error("CRITICAL ERROR:", err);
    }
}

updateCodeWriter();
