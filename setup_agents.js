import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables (mostly for DEV/Local overrides if necessary)
dotenv.config();

const uri = "mongodb+srv://a-series:aseris@cluster0.g4bporx.mongodb.net/a-series";

const aiHireAgent = {
    agentName: "AI HIRE",
    slug: "aihire",
    description: "Your AI Recruitment Assistant. Automates sourcing, screening, and scheduling.",
    category: "HR & Finance",
    avatar: "/AGENTS_IMG/default.png", // Or a specific URL if known
    pricingModel: "Free",
    status: "Live", // This is the crucial field to make it visible
    visibility: "public"
};

const aiSalesAgent = {
    agentName: "AI SALES",
    slug: "aisales",
    description: "Your AI Sales Assistant. Boosts conversions and automates follow-ups.",
    category: "Sales & Marketing",
    avatar: "/AGENTS_IMG/default.png", // Or a specific URL if known
    pricingModel: "Free",
    status: "Live", // Crucial
    visibility: "public"
};

const setupAgents = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(uri);
        console.log("Connected successfully.");

        const collection = mongoose.connection.db.collection('agents');

        console.log("Upserting AI HIRE...");
        await collection.updateOne(
            { slug: "aihire" },
            { $set: aiHireAgent },
            { upsert: true }
        );

        console.log("Upserting AI SALES...");
        await collection.updateOne(
            { slug: "aisales" },
            { $set: aiSalesAgent },
            { upsert: true }
        );

        console.log("Agents seeded successfully. They should now appear in the marketplace.");

    } catch (e) {
        console.error("Error seeding agents:", e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

setupAgents();
