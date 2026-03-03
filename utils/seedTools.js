import agentModel from "../models/Agents.js";

const toolsToSeed = [
    {
        agentName: "AI Personal Assistant",
        slug: "tool-ai-personal-assistant",
        description: "Your dedicated AI assistant for scheduling, notes, and task management.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/personal-assistant.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "AI Personal Assistant is designed to help you stay organized. It manages your calendar, tracks your to-do lists, takes smart notes, and provides personalized reminders to keep you productive.",
        features: [
            "Smart Task Scheduling",
            "Natural Language Note-taking",
            "Calendar Integration",
            "Personalized Reminders"
        ],
        bgGradient: "bg-gradient-to-br from-primary to-purple-600"
    },
    {
        agentName: "Generate Image",
        slug: "tool-image-gen",
        description: "Turn text into stunning AI visuals.",
        category: "Creative",
        avatar: "/AGENTS_IMG/image-gen.png", // specific avatar path, handled by frontend icon mapping if needed
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        // Extra fields to match frontend detailed view
        fullDesc: "Create professional-grade images, illustrations, and art from simple text descriptions. Perfect for marketing materials, social media posts, and creative projects.",
        features: [
            "High-resolution generation",
            "Multiple artistic styles",
            "Commercial usage rights",
            "Fast generation speed"
        ],
        bgGradient: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
    },
    {
        agentName: "Deep Search",
        slug: "tool-deep-search",
        description: "Advanced research & data analysis.",
        category: "Research",
        avatar: "/AGENTS_IMG/deep-search.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Conduct comprehensive web research and data analysis. Deep Search navigates multiple sources to provide accurate, cited, and up-to-date information on any topic.",
        features: [
            "Multi-source verification",
            "Real-time data access",
            "Academic & technical research",
            "Summarized insights"
        ],
        bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
        agentName: "Convert to Audio",
        slug: "tool-audio-convert",
        description: "Transform docs into natural speech.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/audio.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Listen to your documents, articles, and ebooks with natural-sounding AI voices. Supports multiple languages and accents for a personalized listening experience.",
        features: [
            "Human-like AI voices",
            "Multi-language support",
            "Speed control",
            "Download as MP3"
        ],
        bgGradient: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
        agentName: "Universal Document Converter",
        slug: "tool-universal-converter",
        description: "Bidirectional conversion for PDF, DOCX, PPTX, XLSX, and Images.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/converter.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Seamlessly convert between various document formats. Maintain formatting and layout accuracy while converting PDFs, Word docs, Excel sheets, and more.",
        features: [
            "High-fidelity conversion",
            "OCR text extraction",
            "Batch processing",
            "Secure handling"
        ],
        bgGradient: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
        agentName: "Code Writer",
        slug: "tool-code-writer",
        description: "Expert coding & debugging.",
        category: "Developer Tools",
        avatar: "/AGENTS_IMG/code.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Your personal AI pair programmer. Generate clean, efficient code in any language, debug errors, and refactor existing codebases with ease.",
        features: [
            "Multi-language support",
            "Bug detection & fixing",
            "Code refactoring",
            "Architecture suggestions"
        ],
        bgGradient: "bg-gradient-to-br from-emerald-500 to-green-600"
    },
    {
        agentName: "Generate Video",
        slug: "tool-video-gen",
        description: "Transform text into cinematic AI videos.",
        category: "Creative",
        avatar: "/AGENTS_IMG/video-gen.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Bring your stories to life with high-quality AI video generation. Create cinematic clips, animations, and visual content from simple text prompts.",
        features: [
            "Cinematic quality",
            "Realistic animations",
            "Diverse camera angles",
            "Fast rendering"
        ],
        bgGradient: "bg-gradient-to-br from-indigo-500 to-purple-600"
    },
    {
        agentName: "Time Series Forecasting",
        slug: "tool-time-series-forecasting",
        description: "Automated BQML-powered predictive analytics.",
        category: "Data & Intelligence",
        avatar: "/AGENTS_IMG/forecasting.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Automates time-series forecasting by leveraging BigQuery ML (BQML). Provides clear, explained predictions for business trends, inventory, and demand.",
        features: ["BQML Integration", "Predictive Analytics", "Trend Visualization", "Automated Forecasting"],
        bgGradient: "bg-gradient-to-br from-blue-600 to-indigo-700"
    },
    {
        agentName: "LLM Auditor",
        slug: "tool-llm-auditor",
        description: "Verify & refine AI responses for accuracy.",
        category: "Research",
        avatar: "/AGENTS_IMG/auditor.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Evaluates LLM-generated answers, verifies actual accuracy using the web, and refines the response to ensure alignment with real-world knowledge.",
        features: ["Fact Checking", "Accuracy Scoring", "Web Verification", "Quality Refinement"],
        bgGradient: "bg-gradient-to-br from-slate-600 to-slate-800"
    },
    {
        agentName: "Personalized Shopping",
        slug: "tool-personalized-shopping",
        description: "Brand-tailored AI recommendations.",
        category: "Sales & Marketing",
        avatar: "/AGENTS_IMG/shopping.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Delivers personalized recommendations tailored to specific brands, merchants, or marketplaces to enhance user engagement and conversion.",
        features: ["Brand Tailoring", "Recommendation Engine", "Consumer Insights", "Cross-Platform Sync"],
        bgGradient: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
        agentName: "Brand Search Optimization",
        slug: "tool-brand-search-optimization",
        description: "Competitor & keyword analysis for brands.",
        category: "Sales & Marketing",
        avatar: "/AGENTS_IMG/brand-seo.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Analyzes top brand-related keywords and competitor search results, compares content elements like titles and descriptions, and generates optimizations.",
        features: ["Keyword Analysis", "Competitor Research", "SEO Optimization", "Content Strategy"],
        bgGradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
        agentName: "FOMC Research",
        slug: "tool-fomc-research",
        description: "Multi-modal financial data analysis.",
        category: "Research",
        avatar: "/AGENTS_IMG/fomc.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Extracts web data, analyzes complex financial topics, executes custom functions, and generates summary reports from multi-modal data sources.",
        features: ["Financial Modeling", "Data Extraction", "Market Analysis", "Report Generation"],
        bgGradient: "bg-gradient-to-br from-green-700 to-emerald-900"
    },
    {
        agentName: "Image Scoring",
        slug: "tool-image-scoring",
        description: "AI policy-compliant image evaluation.",
        category: "Design & Creative",
        avatar: "/AGENTS_IMG/scoring.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Generates and evaluates images based on text descriptions while ensuring compliance with predefined policies and quality standards.",
        features: ["Policy Compliance", "Quality Scoring", "Visual Evaluation", "Automated Feedback"],
        bgGradient: "bg-gradient-to-br from-violet-600 to-blue-700"
    },
    {
        agentName: "Data Science Agent",
        slug: "tool-data-science",
        description: "Natural language data modeling & viz.",
        category: "Data & Intelligence",
        avatar: "/AGENTS_IMG/data-science.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Queries diverse data across multiple sources using natural language, builds predictive models, visualizes trends, and communicates insights clearly.",
        features: ["Natural Language Queries", "Predictive Modeling", "Visualization", "Insight Generation"],
        bgGradient: "bg-gradient-to-br from-cyan-500 to-blue-600"
    },
    {
        agentName: "RAG Engine",
        slug: "tool-rag-engine",
        description: "Context-aware, grounded AI assistant.",
        category: "Data & Intelligence",
        avatar: "/AGENTS_IMG/rag.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Uses Retrieval-Augmented Generation (RAG) to get information from specified knowledge sources, ensuring factually grounded responses.",
        features: ["Knowledge Integration", "Fact-Grounded Replies", "Context Awareness", "Data Retrieval"],
        bgGradient: "bg-gradient-to-br from-teal-500 to-emerald-600"
    },
    {
        agentName: "Financial Advisor",
        slug: "tool-financial-advisor",
        description: "Educational investment & finance AI.",
        category: "HR & Finance",
        avatar: "/AGENTS_IMG/finance.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Assists human financial advisors by providing educational content about topics related to finance, investments, and market trends.",
        features: ["Market Education", "Investment Insights", "Financial Planning", "Technical Analysis"],
        bgGradient: "bg-gradient-to-br from-green-500 to-emerald-700"
    },
    {
        agentName: "Marketing Agency",
        slug: "tool-marketing-agency",
        description: "Full-stack marketing & launch automation.",
        category: "Sales & Marketing",
        avatar: "/AGENTS_IMG/marketing.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Streamlines website and product launches. Identifies optimal domains, generates entire websites, and develops end-to-end marketing strategies.",
        features: ["Campaign Strategy", "Website Generation", "Market Research", "Domain Optimization"],
        bgGradient: "bg-gradient-to-br from-purple-600 to-pink-700"
    },
    {
        agentName: "Customer Service AI",
        slug: "tool-customer-service",
        description: "Video & image-based support analysis.",
        category: "Business OS",
        avatar: "/AGENTS_IMG/customer-service.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Delivers support by analyzing issues found in streamed videos or uploaded images. Provides relevant recommendations and discounts.",
        features: ["Visual Support Analysis", "Issue Detection", "Smart Recommendations", "Customer Engagement"],
        bgGradient: "bg-gradient-to-br from-sky-500 to-blue-700"
    },
    {
        agentName: "Academic Research Assistant",
        slug: "tool-academic-research",
        description: "Scholarly publication & trend analysis.",
        category: "Research",
        avatar: "/AGENTS_IMG/academic.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Assists researchers in identifying recent publications and discovering emerging research areas through advanced data mining.",
        features: ["Publication Discovery", "Trend Spotting", "Citations Analysis", "Scholarly Insights"],
        bgGradient: "bg-gradient-to-br from-rose-500 to-red-700"
    },
    {
        agentName: "Software Bug Assistant",
        slug: "tool-bug-assistant",
        description: "Internal ticketing & software resolution.",
        category: "Developer Tools",
        avatar: "/AGENTS_IMG/bug-fix.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Assists in software bug resolution. Queries internal ticketing systems and provides debugging suggestions and code fixes.",
        features: ["Ticketing Integration", "Bug Resolution", "Debugging Support", "System Monitoring"],
        bgGradient: "bg-gradient-to-br from-gray-700 to-black"
    },
    {
        agentName: "Travel Concierge",
        slug: "tool-travel-concierge",
        description: "Real-time itinerary & travel planning.",
        category: "Business OS",
        avatar: "/AGENTS_IMG/travel.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Orchestrates personalized travel experiences, from initial planning to real-time itinerary alerts throughout the user's journey.",
        features: ["Itinerary Planning", "Real-time Alerts", "Travel Concierge", "Booking Assistance"],
        bgGradient: "bg-gradient-to-br from-amber-400 to-orange-600"
    },
    {
        agentName: "Derm Foundation",
        slug: "tool-derm-foundation",
        description: "Advanced AI-powered Dermatological Analysis Assistant.",
        category: "Medical & Health",
        avatar: "/AGENTS_IMG/dermatology.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Analyze skin images for condition identification, severity assessment, and basic guidance. Powered by Google Vertex AI.",
        features: [
            "Skin Condition Identification",
            "Severity Assessment",
            "Dermatological Explanations",
            "Skincare Guidance"
        ],
        bgGradient: "bg-gradient-to-br from-rose-400 to-pink-600"
    },
    {
        agentName: "Smart Content Writer",
        slug: "tool-openai-content",
        description: "Create high-quality blogs, marketing copies, social media content, and professional documents using advanced AI reasoning.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/content-writer.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/content",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Create high-quality blogs, marketing copies, social media content, and professional documents using advanced AI reasoning. Designed for businesses and creators who need context-aware, human-like writing with intelligent tone adaptation and long-form content generation.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Human-like Writing", "Tone Adaptation", "Long-form Content", "Marketing Copy"],
        bgGradient: "bg-gradient-to-br from-indigo-500 to-blue-600"
    },
    {
        agentName: "AI Chat Assistant",
        slug: "tool-openai-chat",
        description: "Experience real-time conversational intelligence powered by advanced AI reasoning.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/chat-assistant.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1-mini",
        apiRoute: "/api/openai/chat",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Experience real-time conversational intelligence powered by advanced AI reasoning. Get instant answers, brainstorming support, research assistance, and smart problem-solving through natural, human-like interactions.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Conversational AI", "Brainstorming", "Human-like Interaction", "Smart Problem Solving"],
        bgGradient: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
        agentName: "AI Image Creator Pro",
        slug: "tool-openai-image",
        description: "Generate stunning, high-resolution visuals from simple text prompts using advanced AI image synthesis.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-pro.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-1",
        apiRoute: "/api/openai/image",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Generate stunning, high-resolution visuals from simple text prompts using advanced AI image synthesis. Perfect for branding, marketing creatives, social media designs, and professional visual content creation.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["High-res Synthesis", "Branding Assets", "Social Media Design", "Pro Visual Content"],
        bgGradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600"
    },
    {
        agentName: "Voice Narration Studio",
        slug: "tool-openai-tts",
        description: "Convert written content into natural, expressive human-like voice narration with studio-quality clarity.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/voice-studio.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4o-mini-tts",
        apiRoute: "/api/openai/tts",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Convert written content into natural, expressive human-like voice narration with studio-quality clarity. Ideal for podcasts, presentations, audiobooks, and multilingual content production.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Studio Clarity", "Expressive Narrations", "Multilingual Support", "Audiobook Ready"],
        bgGradient: "bg-gradient-to-br from-orange-400 to-red-500"
    },
    {
        agentName: "Audio Transcriber",
        slug: "tool-openai-stt",
        description: "Accurately convert speech and audio recordings into structured text with intelligent context understanding.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/transcriber.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4o-transcribe",
        apiRoute: "/api/openai/stt",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Accurately convert speech and audio recordings into structured text with intelligent context understanding. Supports multiple accents and noisy environments for reliable transcription workflows.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Context Understanding", "Accent Support", "Noise Reduction", "Structured Transcripts"],
        bgGradient: "bg-gradient-to-br from-teal-400 to-green-500"
    },
    {
        agentName: "AI Code Assistant",
        slug: "tool-openai-code",
        description: "Accelerate development with intelligent code generation, debugging, and optimization across multiple programming languages.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/code-assistant.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/code",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Accelerate development with intelligent code generation, debugging, and optimization across multiple programming languages. Designed to assist developers in building scalable and efficient applications faster.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Code Optimization", "Smart Debugging", "Multi-language", "Scalable Dev"],
        bgGradient: "bg-gradient-to-br from-slate-600 to-slate-800"
    },
    {
        agentName: "Document Intelligence",
        slug: "tool-openai-document",
        description: "Analyze PDFs and documents to extract summaries, insights, and meaningful information instantly.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/doc-intel.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/document",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Analyze PDFs and documents to extract summaries, insights, and meaningful information instantly. Enables smart document understanding, content restructuring, and knowledge extraction.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Smart Summaries", "Data Extraction", "Knowledge Mapping", "Deep Insights"],
        bgGradient: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
        agentName: "Vision Analyzer",
        slug: "tool-openai-vision",
        description: "Understand and interpret images using advanced multimodal AI analysis.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/vision.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/vision",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Understand and interpret images using advanced multimodal AI analysis. Detect visual context, objects, and scene meaning to generate intelligent insights from uploaded images.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Multimodal Analysis", "Context Detection", "Object Recognition", "Intelligence Extraction"],
        bgGradient: "bg-gradient-to-br from-violet-500 to-purple-700"
    },
    {
        agentName: "Real Time Web Search",
        slug: "tool-openai-search",
        description: "Access the latest information and news from the web in real-time with source-grounded accuracy.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/search.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/search",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Access the latest information and news from the web in real-time with source-grounded accuracy. Combines OpenAI's reasoning with live search results to provide factual, up-to-date answers with clear source citations.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Live Web Access", "Source Citations", "Latest News & Trends", "Fact-checked Results"],
        bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-700"
    },
    {
        agentName: "Professional Translator",
        slug: "tool-openai-translator",
        description: "Translate documents and communications while maintaining professional tone and cultural context.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/translator.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/translate",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Go beyond standard translation. This tool maintains professional tone, industry-specific jargon, and cultural nuances across multiple languages. Ideal for international business correspondence and formal document localization.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Tone Preservation", "Industry Jargon Support", "Cultural Nuance AI", "Multi-language Support"],
        bgGradient: "bg-gradient-to-br from-blue-600 to-indigo-800"
    },
    {
        agentName: "Structured Data Extractor",
        slug: "tool-openai-extractor",
        description: "Transform messy, unstructured text into clean, organized JSON data automatically.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/extractor.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4.1",
        apiRoute: "/api/openai/extract",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Automatically extract names, dates, prices, and complex entities from chaotic text blocks. This tool uses high-level reasoning to turn unstructured information into clean, machine-readable JSON data ready for spreadsheets or databases.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Entity Recognition", "JSON Export Ready", "Clean Data Formatting", "Pattern Intelligence"],
        bgGradient: "bg-gradient-to-br from-slate-700 to-zinc-900"
    }
];

export const seedTools = async () => {
    try {
        for (const tool of toolsToSeed) {
            await agentModel.findOneAndUpdate(
                { slug: tool.slug },
                { $set: tool },
                { upsert: true, new: true }
            );
            console.log(`[SEED] Ensured tool: ${tool.agentName}`);
        }
        console.log("[SEED] Tools seeding check complete.");
    } catch (error) {
        console.error("[SEED ERROR]", error);
    }
};
