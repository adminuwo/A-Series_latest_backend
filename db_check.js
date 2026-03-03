import mongoose from "mongoose";

const uri = "mongodb+srv://a-series:aseris@cluster0.g4bporx.mongodb.net/a-series";

const checkAgents = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");
        const agents = await mongoose.connection.db.collection('agents').find({
            agentName: { $in: [/aihire/i, /aisales/i, /ai hire/i, /ai sales/i] }
        }).toArray();
        console.log("Found agents:", JSON.stringify(agents, null, 2));

        if (agents.length === 0) {
            console.log("No AIHIRE or AISALES agents found. We might need to create them.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
};

checkAgents();
