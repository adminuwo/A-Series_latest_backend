import agentModel from "../models/Agents.js";

const toolsToSeed = [
    // --- OPENAI GROUP (FIRST) ---
    // Search Suite
    {
        agentName: "AI Web Search Preview",
        slug: "tool-openai-search-preview",
        description: "Special model designed to search the internet with high indexing priority.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/search-preview.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-search-preview",
        apiRoute: "/api/openai/search",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Access the latest information and news from the web in real-time. This special preview model is designed specifically for searching the internet, providing deep indexing and rapid retrieval of current events.\n\nPowered by OpenAI GPT-4o Search (preview).",
        features: ["Internet Optimized", "Specialized Search", "High-speed Indexing", "Real-time Access"],
        bgGradient: "bg-gradient-to-br from-emerald-400 to-teal-500"
    },
    {
        agentName: "AI Web Search Pro",
        slug: "tool-openai-search-pro",
        description: "Main multimodal model that can call advanced web search and browsing tools.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/search-pro.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-search-pro",
        apiRoute: "/api/openai/search",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "The primary multimodal engine for professional web exploration. Seamlessly integrates chat with real-time web browsing to answer complex queries with verified citations.\n\nPowered by OpenAI GPT-4o (Multimodal).",
        features: ["Chat + Browsing", "Multimodal Analysis", "Tool-assisted Search", "Pro Research"],
        bgGradient: "bg-gradient-to-br from-blue-600 to-indigo-700"
    },
    {
        agentName: "AI Web Search Lite",
        slug: "tool-openai-search-lite",
        description: "Faster and cheaper web search version for quick information lookup.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/search-lite.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-search-mini",
        apiRoute: "/api/openai/search",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Efficiency-first web searching. Designed for rapid factual lookups and news summaries where low latency and cost-effectiveness are priorities.\n\nPowered by OpenAI GPT-4o-mini.",
        features: ["High Speed", "Budget Friendly", "Fact Lookups", "Instant Answers"],
        bgGradient: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
        agentName: "AI Real-time Search Assistant",
        slug: "tool-openai-search-realtime",
        description: "Advanced model for real-time conversations integrated with streaming web data.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/search-realtime.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-search-realtime",
        apiRoute: "/api/openai/search",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Process streaming text and audio inputs in true real-time, grounded by live web information. Ideal for conversational agents requiring millisecond-level updates.\n\nPowered by OpenAI GPT-realtime.",
        features: ["Streaming Audio/Text", "Real-time Melds", "Web Data Grounding", "Millisecond Latency"],
        bgGradient: "bg-gradient-to-br from-magenta-500 to-purple-600"
    },

    // Image Editing Suite
    {
        agentName: "AI Image Editing Pro",
        slug: "tool-openai-image-edit",
        description: "Transform and refine existing images with pinpoint accuracy using advanced AI inpainting and editing.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-edit-pro.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-1.5",
        apiRoute: "/api/openai/image-edit",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Professional-grade image editing powered by OpenAI. Upload an image and use natural language to add, remove, or modify elements with pixel-perfect consistency.\n\nPowered by advanced OpenAI intelligence (gpt-image-1.5) for premium creative and cognitive AI capabilities.",
        features: ["Smart Inpainting", "Object Modification", "Style Consistency", "High-res Output"],
        bgGradient: "bg-gradient-to-br from-violet-500 to-fuchsia-600"
    },
    {
        agentName: "AI Image Editing Standard",
        slug: "tool-openai-image-edit-standard",
        description: "High-quality AI image editing for daily creative tasks and professional refinements.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-edit-standard.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-1",
        apiRoute: "/api/openai/image-edit",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Versatile image editing powered by OpenAI. Perfect for standard adjustments, object insertion, and layout modifications with a balance of speed and quality.\n\nPowered by OpenAI (gpt-image-1) for reliable and creative AI image editing solutions.",
        features: ["Balanced Performance", "Object Removal", "Creative Adjustments", "Fast Processing"],
        bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
        agentName: "AI Image Editing Lite",
        slug: "tool-openai-image-edit-lite",
        description: "Fast and lightweight AI image editing for quick fixes and budget-friendly creations.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-edit-lite.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-1-mini",
        apiRoute: "/api/openai/image-edit",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Highly efficient and budget-friendly image editing. Designed for rapid iterations and simple visual tweaks without compromising on essential AI intelligence.\n\nPowered by OpenAI (gpt-image-1-mini) for efficient and accessible image synthesis.",
        features: ["Quick Iterations", "Essential Fixes", "Budget Friendly", "Instant Results"],
        bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },

    // Image Creator Suite
    {
        agentName: "AI Image Creator Pro",
        slug: "tool-openai-image",
        description: "Generate stunning, ultra-high-resolution visuals from simple text prompts with maximum creative fidelity.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-pro.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-pro",
        apiRoute: "/api/openai/image",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "The pinnacle of AI image generation. Create professional-grade branding assets, marketing creatives, and high-fidelity art with advanced compositional understanding.\n\nPowered by OpenAI DALL-E 3 for premium visual storytelling.",
        features: ["Highest Resolution", "Compositional Excellence", "Branding Assets", "Complex Scene Synth"],
        bgGradient: "bg-gradient-to-br from-fuchsia-500 to-purple-600"
    },
    {
        agentName: "AI Image Creator Standard",
        slug: "tool-openai-image-standard",
        description: "High-quality AI image generation for daily professional and creative needs with balanced performance.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-standard.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-standard",
        apiRoute: "/api/openai/image",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Reliable and high-quality image generation. Ideal for social media content, blog visuals, and quick conceptual art with consistent artistic integrity.\n\nPowered by OpenAI (GPT-Image-1) for reliable creative output.",
        features: ["High Quality", "Consistent Styles", "Social Media Ready", "Balanced Speed"],
        bgGradient: "bg-gradient-to-br from-blue-400 to-indigo-500"
    },
    {
        agentName: "AI Image Creator Lite",
        slug: "tool-openai-image-lite",
        description: "Fast and efficient AI image generation for rapid prototyping and budget-friendly visual content.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/image-lite.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-image-1-mini",
        apiRoute: "/api/openai/image",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Highly lightweight and efficient image synthesis. Perfect for rapid visual iterations, brainstorming, and simple graphics without high overhead.\n\nPowered by OpenAI (GPT-Image-1 Mini) for efficient creativity.",
        features: ["Rapid Generation", "Efficient Choice", "Prototyping Ready", "Budget Friendly"],
        bgGradient: "bg-gradient-to-br from-emerald-400 to-teal-500"
    },

    // Video Creator Suite
    {
        agentName: "AI Video Creator (Sora-2)",
        slug: "tool-openai-video-standard",
        description: "Transform your text prompts into high-quality AI videos with smooth motion synthesis.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/video-standard.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-video-1",
        apiRoute: "/api/openai/video",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Reliable AI video generation for personal and professional use. Create high-quality clips from text prompts with consistent motion and clear visuals.\n\nPowered by OpenAI Sora (sora-2) for standard tier production.",
        features: ["Standard Resolution", "Smooth Motion", "Text-to-Video", "Rapid Processing"],
        bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
        agentName: "AI Video Creator Pro (Sora-2 Pro)",
        slug: "tool-openai-video",
        description: "Experience the next level of cinematic AI video generation with enhanced realism and consistency.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/video-pro.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-video-1.5",
        apiRoute: "/api/openai/video",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Experience the future of video creation with advanced cinematic motion synthesis. Generate high-resolution videos from simple text descriptions with incredible realism.\n\nPowered by OpenAI Sora (sora-2-pro) for professional grade outputs.",
        features: ["Cinematic Quality", "Enhanced Real realism", "Consistent Motion", "Creative Control"],
        bgGradient: "bg-gradient-to-br from-purple-600 to-indigo-700"
    },
    {
        agentName: "AI Video Creator Max (Sora-2 Pro High-Res)",
        slug: "tool-openai-video-max",
        description: "The ultimate AI video tool for ultra-high-resolution cinematic production and complex scene synthesis.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/video-max.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-video-2",
        apiRoute: "/api/openai/video",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "The pinnacle of AI video technology. Optimized for ultra-high-resolution outputs and complex scene synthesis, delivering the highest visual fidelity available.\n\nPowered by OpenAI Sora (sora-2-pro High-Res) for highest tier production requirements.",
        features: ["Ultra-High Resolution", "Highest Fidelity", "Complex Scenes", "Premium Production"],
        bgGradient: "bg-gradient-to-br from-amber-500 to-orange-600"
    },

    // OpenAI Utilities
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
    },
    {
        agentName: "Semantic AI Embeddinger",
        slug: "tool-openai-embeddings",
        description: "Generate mathematical vector representations of text for semantic search and similarity analysis.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/embeddings.png",
        status: "Live",
        provider: "openai",
        modelMapping: "text-embedding-3-small",
        apiRoute: "/api/openai/embeddings",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Transform text into numeric vectors that represent semantic meaning. This advanced tool allows you to compare different text blocks for similarity or build your own custom vector-based search engine.\n\nPowered by advanced OpenAI intelligence for premium creative and cognitive AI capabilities.",
        features: ["Vector Generation", "Semantic Comparison", "Deep Search RAG ready", "Dimensional Analysis"],
        bgGradient: "bg-gradient-to-br from-blue-900 to-slate-900"
    },

    // --- VERTEX AI GROUP (SECOND) ---
    // Gemini Lyrics Suite
    // Vertex Originals
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
        fullDesc: "AI Personal Assistant is designed to help you stay organized. Powered by Google Vertex AI, it manages your calendar, tracks your to-do lists, takes smart notes, and provides personalized reminders to keep you productive.",
        features: [
            "Smart Task Scheduling",
            "Natural Language Note-taking",
            "Calendar Integration",
            "Personalized Reminders"
        ],
        provider: "google",
        bgGradient: "bg-gradient-to-br from-primary to-purple-600"
    },
    {
        agentName: "AI Image Generator (Imagen 4 Ultra)",
        slug: "tool-image-gen",
        description: "Generate elite, ultra-high-resolution visuals with complex compositional understanding.",
        category: "Creative",
        avatar: "/AGENTS_IMG/image-gen.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "The elite tier of Google's image generation suite. Imagen 4 Ultra is designed for the most demanding creative projects, delivering unmatched photorealism, deep compositional understanding, and ultra-high-resolution outputs for pro-level art and branding.\n\nPowered by Google Vertex AI (Imagen 4 Ultra).",
        features: [
            "Elite Photorealism",
            "Ultra-High Resolution",
            "Complex Compositional Reasoning",
            "Professional Branding Fidelity"
        ],
        provider: "google",
        bgGradient: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
    },
    {
        agentName: "Deep Search (Gemini 2.0 Pro)",
        slug: "tool-deep-search",
        description: "Advanced research & data analysis powered by Gemini 2.0 Pro.",
        category: "Research",
        avatar: "/AGENTS_IMG/deep-search.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Conduct comprehensive web research and data analysis with the power of Gemini 2.0 Pro. Deep Search navigates multiple sources to provide accurate, cited, and up-to-date information on any topic.\n\nPowered by Google Vertex AI (Gemini 2.0 Pro Search).",
        features: [
            "Gemini 2.0 Pro Engine",
            "Real-time Web Grounding",
            "Advanced Research & Citations",
            "Summarized Analytical Insights"
        ],
        provider: "google",
        bgGradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
        agentName: "AI Video Generator (Veo 3)",
        slug: "tool-video-gen",
        description: "Create high-definition cinematic videos with ultra-realistic motion.",
        category: "Creative",
        avatar: "/AGENTS_IMG/video-gen.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Step into the future of cinematic production with Google's most advanced video generation model. Veo 3 delivers unmatched realistic motion, ultra-high-definition visual fidelity, and sophisticated camera controls.\n\nPowered by Google Vertex AI (Veo 3).",
        features: [
            "Ultra-HD Resolution",
            "Realistic Motion Synthesis",
            "Cinematic Camera Controls",
            "Long-form Scene Production"
        ],
        provider: "google",
        bgGradient: "bg-gradient-to-br from-indigo-500 to-purple-600"
    },
    {
        agentName: "Lyria 2 for Music Generation",
        slug: "tool-vertex-music-gen",
        description: "Latent text-to-audio diffusion model for high-quality instrumental music.",
        category: "Creative",
        avatar: "/AGENTS_IMG/AIMUSIC.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Lyria 2 is Google Cloud's latest high-quality audio generation model, capable of creating diverse soundscapes and musical pieces from text prompts. Developed in partnership with Google DeepMind, it supports instrumental music generation, negative prompting, and multiple samples.\n\nPowered by Google Vertex AI (lyria-002).",
        features: ["Text-to-Music Generation", "Negative Prompting", "Reproducibility (Seed)", "Multiple Samples"],
        bgGradient: "bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900"
    },
    {
        agentName: "Image Editing",
        slug: "tool-image-edit",
        description: "Transform and polish your images with AI precision.",
        category: "Creative",
        avatar: "/AGENTS_IMG/image-edit-3d.png",
        status: "Live",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Professional-grade image manipulation powered by Google Vertex AI. Edit, enhance, and transform your photos with advanced AI tools for lighting, composition, and object removal.",
        features: ["Smart Retouching", "Object Removal", "Lighting Adjustment", "Style Transfer"],
        provider: "google",
        bgGradient: "bg-gradient-to-br from-purple-600 via-magenta-500 to-pink-500"
    },
    {
        agentName: "Audio Transcriber (Chirp 3)",
        slug: "tool-vertex-stt",
        description: "Elite multilingual speech-to-text recognition with enhanced accuracy.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/AITRANS.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Experience the next generation of speech-to-text technology. Chirp 3 is Google's latest multilingual ASR model, designed for high accuracy and speed across dozens of languages. Includes support for diarization and noisy environments.\n\nPowered by Google Vertex AI (Chirp 3).",
        features: ["Multilingual Accuracy", "Real-time Transcription", "Speaker Diarization", "Noise Resilience"],
        bgGradient: "bg-gradient-to-br from-teal-400 to-emerald-600"
    },
    {
        agentName: "AI Voice Generator (Neural2)",
        slug: "tool-audio-convert",
        description: "Transform written content into natural, studio-quality human speech.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/audio-convert.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Listen to your documents with natural-sounding AI voices. Powered by Google Vertex AI (Neural2 & Journey models), this assistant provides professional-grade narration with expressive tone and multilingual support.\n\nPowered by Google Vertex AI (Neural2).",
        features: ["Studio-Quality Voices", "Neural2 Processing", "Multilingual Support", "Download as MP3"],
        bgGradient: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
        agentName: "AI Document Converter (Doc AI)",
        slug: "tool-universal-converter",
        description: "Intelligent bidirectional conversion for PDF, DOCX, XLSX, and Images.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/doc-converter.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Power your document workflows with Google's elite Document AI. Seamlessly convert between complex formats while maintaining layout integrity and extracting high-fidelity structured data.\n\nPowered by Google Vertex AI (Document AI & Gemini 1.5 Pro).",
        features: ["High-Fidelity Conversion", "Layout Intelligence", "OCR & Data Extraction", "Batch Processing"],
    },
    {
        agentName: "AI Code Writer (Gemini 1.5 Pro)",
        slug: "tool-code-writer",
        description: "Expert coding, debugging, and architecture suggestions powered by Gemini.",
        category: "Developer Tools",
        avatar: "/AGENTS_IMG/code-writer.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Your elite AI pair programmer. Leverage the power of Gemini 1.5 Pro to generate clean, scalable code, debug complex errors, and refactor architecture with massive context understanding.\n\nPowered by Google Vertex AI (Gemini 1.5 Pro).",
        features: ["Pro-Level Coding", "Smart Debugging", "Architecture Design", "Multi-language Support"],
        bgGradient: "bg-gradient-to-br from-emerald-500 to-green-600"
    },

    // Utilities / Others
];

export const seedTools = async () => {
    try {
        const forcedOrderSlugs = [
            // OpenAI First
            'tool-openai-search-preview',
            'tool-openai-search-pro',
            'tool-openai-search-lite',
            'tool-openai-search-realtime',
            'tool-openai-image-edit',
            'tool-openai-image-edit-standard',
            'tool-openai-image-edit-lite',
            'tool-openai-image',
            'tool-openai-image-standard',
            'tool-openai-image-lite',
            'tool-openai-video-standard',
            'tool-openai-video',
            'tool-openai-video-max',
            'tool-openai-content',
            'tool-openai-chat',
            'tool-openai-tts',
            'tool-openai-stt',
            'tool-openai-code',
            'tool-openai-document',
            'tool-openai-vision',
            'tool-openai-translator',
            'tool-openai-extractor',
            'tool-openai-embeddings',
            // Vertex AI Second
            'tool-ai-personal-assistant',
            'tool-image-gen',
            'tool-deep-search',
            'tool-video-gen',
            'tool-vertex-music-gen',
            'tool-vertex-stt',
            'tool-audio-convert',
            'tool-universal-converter',
            'tool-code-writer',
            'tool-image-edit',
            // Others
            // Deleted Tools (Keep in deletion list)
            'tool-marketing-agency',
            'tool-customer-service',
            'tool-academic-research',
            'tool-bug-assistant',
            'tool-travel-concierge',
            'tool-derm-foundation',
            'tool-brand-search-optimization',
            'tool-fomc-research',
            'tool-image-scoring',
            'tool-data-science',
            'tool-rag-engine',
            'tool-financial-advisor',
            'tool-time-series-forecasting',
            'tool-llm-auditor',
            'tool-personalized-shopping',
            'tool-gemini-lyrics-flash',
            'tool-gemini-lyrics-pro',
            'tool-gemini-multimodal-flash',
            'tool-gemini-creative-pro'
        ];

        // Ensure old/redundant tools are removed
        await agentModel.deleteOne({ slug: 'tool-music-gen' });
        await agentModel.deleteMany({ slug: { $in: forcedOrderSlugs } });
        console.log("[SEED] Reset marketplace sequence: OpenAI First, Vertex AI Second.");

        for (const tool of toolsToSeed) {
            await agentModel.findOneAndUpdate(
                { slug: tool.slug },
                { $set: tool },
                { upsert: true, new: true }
            );
            console.log(`[SEED] Ensured tool: ${tool.agentName}`);
        }
        console.log("[SEED] Tools re-sequencing complete.");
    } catch (error) {
        console.error("[SEED ERROR]", error);
    }
};
