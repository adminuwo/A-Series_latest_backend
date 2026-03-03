import connectDB from "./config/db.js";
import Agent from "./models/Agents.js";

const aiHireAgent = {
    agentName: "AI HIRE",
    slug: "aihire",
    description: "Your AI Recruitment Assistant. Automates sourcing, screening, and scheduling.",
    category: "HR & Finance",
    avatar: "/AGENTS_IMG/default.png",
    pricingModel: "Free",
    status: "Live", // Visible
    visibility: "public"
};

const aiSalesAgent = {
    agentName: "AI SALES",
    slug: "aisales",
    description: "Your AI Sales Assistant. Boosts conversions and automates follow-ups.",
    category: "Sales & Marketing",
    avatar: "/AGENTS_IMG/default.png",
    pricingModel: "Free",
    status: "Live", // Visible
    visibility: "public"
};

const setupAgents = async () => {
    try {
        console.log("Connecting using connectDB...");
        await connectDB();
        console.log("Database connected successfully. Proceeding to Seed Agents...");

        console.log("Upserting AI HIRE...");
        await Agent.findOneAndUpdate(
            { slug: "aihire" },
            { $set: aiHireAgent },
            { upsert: true, new: true }
        );

        console.log("Upserting AI SALES...");
        await Agent.findOneAndUpdate(
            { slug: "aisales" },
            { $set: aiSalesAgent },
            { upsert: true, new: true }
        );

        console.log("Agents properly seeded! Exiting.");
        process.exit(0);

    } catch (e) {
        console.error("Error seeding agents:", e);
        process.exit(1);
    }
};

setupAgents();
