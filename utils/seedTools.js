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
        agentName: "AI Video Creator",
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
        agentName: "AI Video Creator Pro",
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
        agentName: "AI Video Creator Max",
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
        description: "Professional STT engine for converting audio and video to text with Speaker Identification.",
        category: "AI TOOL",
        avatar: "/AGENTS_IMG/transcriber.png",
        status: "Live",
        provider: "openai",
        modelMapping: "gpt-4o-transcribe",
        apiRoute: "/api/openai/stt",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Accurately convert spoken words from audio or video files (MP3, WAV, M4A, FLAC, MP4) into written text. Supports meetings, podcasts, interviews, and lectures with high precision.\n\n**Advanced Intelligence:**\n- **Speech-to-Text & Diarization**: High-accuracy ASR with multi-speaker detection (Speaker 1, Speaker 2).\n- **Real-time Transcription**: Instant live captioning and meeting note generation.\n- **Timestamping & Punctuation**: Automatic time markers and professional formatting for readability.\n- **Subtitle Generation**: Effortlessly convert transcripts into video-ready subtitles (SRT, VTT, ASS) for YouTube, courses, and films.\n- **Noise Filtering & Clarity**: Advanced background noise suppression (traffic, wind, crowd) for crystal-clear results.\n- **Keyword & Sentiment Detection**: Automatically identifies important terms and analyzes the emotional tone of speakers.\n- **Voice Command Ready**: Detects trigger commands like 'Start recording' for hands-free operation.\n- **Search & Edit**: Fully searchable transcripts with an intuitive editor to correct text or adjust metadata.\n- **Multilingual Support**: Auto-detects and translates English, Hindi, Spanish, and more.\n\nPowered by advanced OpenAI intelligence for professional-grade transcription ecosystems.",
        features: ["Subtitle Generation (SRT/VTT)", "Sentiment Analysis", "Voice Command Detection", "Noise Filtering"],
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
        agentName: "AI Image Generator",
        slug: "tool-image-gen",
        description: "Google's advanced text-to-image technology for generating novel images with ultra-high resolution and SynthID watermarking.",
        category: "Creative",
        avatar: "/AGENTS_IMG/image-gen.png",
        status: "Live",
        pricingModel: "Free",
        pricing: {
            type: "Free",
            plans: []
        },
        fullDesc: "Imagen 4 Ultra brings Google's advanced text-to-image technology to your creative projects. Use text prompts to generate novel, high-quality images that match your specific brand requirements with enterprise-grade reliability.\n\nAdvanced Capabilities:\n• Multiple Aspect Ratios: Support generation with 1:1, 9:16, 16:9, 3:4, and 4:3 aspect ratios.\n• High-Resolution Output: Generate images in crisp 1k or 2k output resolutions.\n• Invisible Tracking: Integrated digital watermarking (SynthID).\n• Prompt Enhancement: Automatically rewrites inputs using LLM-based intelligence to generate better results.\n\nPowered by Google Vertex AI (imagen-4.0-ultra-generate-001).",
        features: [
            "1k & 2k Resolutions",
            "Multiple Aspect Ratios",
            "LLM Prompt Enhancement",
            "SynthID Watermarking"
        ],
        provider: "google",
        bgGradient: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
    },
    {
        agentName: "Deep Search",
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
        agentName: "AI Video Generator",
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
        agentName: "Music Generation",
        slug: "tool-vertex-music-gen",
        description: "Latent text-to-audio diffusion model for high-quality instrumental music.",
        category: "Creative",
        avatar: "/AGENTS_IMG/music-generation.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Lyria 2 is Google Cloud's latest high-quality audio generation model, developed in partnership with Google DeepMind. It is a latent text-to-audio diffusion model capable of creating diverse soundscapes and musical pieces from simple text prompts.\n\nKey Capabilities:\n• Text-to-Music: Generate high-fidelity instrumental music directly from descriptions.\n• Negative Prompting: Fine-tune output by specifying elements to exclude from the audio.\n• Reproducibility: Support for Seed values ensures consistent outputs for identical parameters.\n• Multiple Samples: Generate and compare up to 4 distinct musical snippets in a single request.\n• Studio Quality: Outputs 48kHz WAV audio with professional-grade clarity.\n• SynthID Watermarking: Integrated with digital watermarking for responsible AI tracking.\n\nOptimized for composers, game developers, and content creators. Powered by Vertex AI (lyria-002).",
        features: ["48kHz Studio Quality", "Negative Prompting", "Seed Reproducibility", "SynthID Watermarking"],
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
        agentName: "Audio Transcriber",
        slug: "tool-vertex-stt",
        description: "Elite multilingual speech-to-text with advanced Speaker Diarization.",
        category: "Productivity",
        avatar: "/AGENTS_IMG/audio-transcriber.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Step into the next generation of speech-to-text technology. Chirp 3 is Google's latest multilingual ASR model, optimized for high accuracy across dozens of languages. Perfect for complex meetings and multi-speaker interviews.\n\n**Elite Capabilities:**\n- **Multilingual Support**: High accuracy across global languages including English and Hindi with auto-detection.\n- **Speaker Identification**: Labels speakers automatically in panel discussions and interviews.\n- **Sentiment & Emotion Analysis**: Analyzes the sentiment of every speaker to provide emotional context.\n- **Subtitle & Caption Generation**: Export transcripts directly to SRT, VTT, or ASS formats for YouTube and films.\n- **Voice Command Recognition**: Specialized detection for commands like 'Start recording' or 'Next slide'.\n- **Advanced Noise Resilience**: Handles traffic, crowd sounds, and echo for clear transcriptions in noisy environments.\n- **Live Transcription & Timestamps**: Instant captioning with precise time markers.\n- **Keyword Analysis**: Automatically highlights key terms like pricing, investment, or project names.\n- **Searchable & Editable**: Navigate long transcripts instantly and make manual corrections effortlessly.\n\nPowered by Google Vertex AI (Chirp 3).",
        features: ["Subtitle Export (SRT/VTT)", "Sentiment Analysis", "Voice Commands", "Noise Suppression"],
        bgGradient: "bg-gradient-to-br from-teal-400 to-emerald-600"
    },
    {
        agentName: "AI Voice Generator",
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
        agentName: "AI Document Converter",
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
        agentName: "AI Code Writer",
        slug: "tool-code-writer",
        description: "AI Code Writer is an intelligent development assistant that helps developers generate, debug, and optimize code across multiple programming languages.",
        category: "Developer Tools",
        avatar: "/AGENTS_IMG/code-writer.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "AI Code Writer is an intelligent development assistant that helps developers generate, debug, and optimize code across multiple programming languages.\n\nPowered by Google Vertex AI (Gemini 1.5 Pro).",
        features: ["Pro-Level Coding", "Smart Debugging", "Architecture Design", "Multi-language Support"],
        bgGradient: "bg-gradient-to-br from-emerald-500 to-green-600"
    },
    {
        agentName: "Image Understanding",
        slug: "tool-image-understanding-claude",
        description: "Anthropic’s most advanced AI model, designed for complex reasoning, advanced coding, research, and intelligent automation.",
        category: "Creative",
        avatar: "/AGENTS_IMG/image-understanding.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Claude Opus 4.1 is Anthropic’s most advanced AI model, designed for complex reasoning, advanced coding, research, and intelligent automation. It can analyze large datasets, understand long documents, generate high-quality code, and assist with sophisticated problem-solving across multiple domains.\n\nKey Capabilities:\n• Advanced Reasoning: Solves complex problems, performs deep analysis, and handles multi-step reasoning tasks.\n• Professional Code Generation: Generates, explains, and debugs code across multiple programming languages.\n• Long Document Analysis: Understands and analyzes large documents, reports, research papers, and technical content.\n• AI Agent Support: Ideal for building autonomous AI agents that can plan tasks, make decisions, and perform workflows.\n• Natural Language Understanding: Accurately interprets user instructions and generates detailed, context-aware responses.\n• Research & Knowledge Assistance: Helps with research, summarization, information extraction, and technical explanations.\n• Content Creation: Generates structured content such as articles, reports, documentation, and presentations.\n• Multitask Intelligence: Handles a wide range of tasks including coding, writing, analysis, and problem-solving in a single model.",
        features: [
            "Advanced Reasoning",
            "Professional Code Gen",
            "Long Document Analysis",
            "Multitask Intelligence"
        ],
        bgGradient: "bg-gradient-to-br from-amber-600 to-orange-800"
    },
    {
        agentName: "AI Pixel Segmentor",
        slug: "tool-pixel-segmentor-sam",
        description: "Advanced vision model designed for precise pixel-level image segmentation using natural language prompts or simple clicks.",
        category: "Vision",
        avatar: "/AGENTS_IMG/pixel-segmentor.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Segment Anything 3 is an advanced vision foundation model designed for precise pixel-level image segmentation. It can detect and isolate objects in images using natural language prompts, bounding boxes, or simple clicks, enabling developers to segment any object or region with high accuracy.\n\nThe model supports open-vocabulary segmentation, meaning it can identify and segment objects even if they were never explicitly trained as predefined categories. This makes it ideal for applications such as computer vision systems, image editing tools, medical imaging, and dataset annotation.\n\nKey Capabilities:\n• Prompt-Based Segmentation: Segment objects using text, bounding boxes, or click points.\n• Pixel-Level Masking: Produces high-quality segmentation masks that outline objects precisely.\n• Open-Vocabulary Detection: Segment any concept described by text, not just predefined classes.\n• Multi-Object Segmentation: Detect and segment multiple objects simultaneously in a single image.\n• Video Object Tracking: Track segmented objects across video frames for dynamic analysis.\n• Zero-Shot Segmentation: Generalizes to new or unseen objects without additional training.\n• Scalable AI Vision: Foundation model designed for large-scale image and video processing pipelines.",
        features: [
            "Pixel-Level Masks",
            "Open-Vocabulary",
            "Prompted Segments",
            "Zero-Shot Learning"
        ],
        bgGradient: "bg-gradient-to-br from-violet-600 to-indigo-900"
    },
    {
        agentName: "Pathology",
        slug: "tool-pathology-medgemma",
        description: "Domain-specialized foundation models optimized for medical imagery, pathology reports, and healthcare data analysis.",
        category: "Medical",
        avatar: "/AGENTS_IMG/pathology.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "MedGemma is a family of domain-specialized foundation models built on the Gemma architecture and optimized for medical and healthcare applications. It is designed to process and reason over clinical, biomedical, and diagnostic data, enabling advanced understanding of medical terminology, clinical narratives, and medical imagery.\n\nThe model integrates large language model capabilities with medical domain training, allowing it to perform complex analysis, contextual interpretation, and structured reasoning within healthcare datasets. MedGemma supports multimodal medical data processing, enabling simultaneous interpretation of textual and visual clinical information such as pathology images and medical documentation.\n\nKey Capabilities:\n• Medical Domain Understanding: Deep comprehension of biomedical terminology and pathology reports.\n• Multimodal Processing: Analyze and correlate medical text and images within a unified framework.\n• Clinical Reasoning: Supports structured reasoning to derive contextual insights from medical data.\n• Biomedical Knowledge: Leverages large-scale clinical data to interpret disease patterns.\n• Advanced NLP: Medical text generation, summarization, and structured information extraction.\n• Enterprise Integration: Scalable deployment on Vertex AI for healthcare data pipelines.",
        features: [
            "Clinical Reasoning",
            "Pathology Image Analysis",
            "Medical Multimodality",
            "Secure HIPAA Compliance"
        ],
        bgGradient: "bg-gradient-to-br from-teal-600 to-emerald-900"
    },
    {
        agentName: "Derm Foundation",
        slug: "tool-derm-foundation",
        description: "Specialized medical foundation model designed for dermatology image analysis and skin disease understanding.",
        category: "Medical",
        avatar: "/AGENTS_IMG/derm-foundation.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Derm Foundation is a specialized medical foundation model designed for dermatology image analysis and skin disease understanding. The model is trained on large-scale dermatological datasets to learn visual patterns of skin conditions, lesions, and dermatological abnormalities.\n\nKey Capabilities:\n• Dermatology Image Understanding: Ability to interpret dermatological visual features such as skin lesions, pigmentation patterns, textures, and abnormalities.\n• High-Quality Image Embeddings: Generates dense feature embeddings from dermatology images, enabling efficient representation of skin disease characteristics.\n• Skin Disease Pattern Recognition: Learns complex visual patterns associated with various dermatological conditions and skin disorders.\n• Medical Image Feature Extraction: Extracts clinically meaningful visual features from dermatology images that can be used for downstream AI models.\n• Support for Model Training: Embeddings produced by the model can be used to train custom classifiers for dermatology diagnosis and research tasks.\n• Integration with AI Pipelines: Can be integrated into Vertex AI pipelines and medical imaging workflows for scalable dermatology AI development.",
        features: [
            "Dermatology Vision",
            "Image Embeddings",
            "Pattern Recognition",
            "Feature Extraction"
        ],
        bgGradient: "bg-gradient-to-br from-cyan-600 to-teal-900"
    },
    {
        agentName: "Radiology",
        slug: "tool-cxr-foundation",
        description: "Specialized medical imaging foundation model developed for radiology applications, particularly chest X-ray analysis.",
        category: "Radiology",
        avatar: "/AGENTS_IMG/cxr-foundation.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "CXR Foundation is a specialized medical imaging foundation model developed for radiology applications, particularly chest X-ray analysis. The model is trained on large-scale radiology datasets containing chest radiographs, enabling it to learn complex visual representations of anatomical structures and radiological abnormalities.\n\nKey Capabilities:\n• Radiology Image Understanding: Ability to interpret visual structures present in chest X-ray images, including lungs, heart, bones, and surrounding thoracic anatomy.\n• High-Quality Medical Image Embeddings: Generates dense feature embeddings that represent radiological patterns and abnormalities present in X-ray images.\n• Disease Pattern Recognition: Learns visual indicators associated with radiological conditions and thoracic abnormalities through large-scale training data.\n• Medical Feature Extraction: Extracts clinically meaningful imaging features that can be used for diagnostic modeling and radiology research.\n• Support for Downstream Model Training: Embeddings produced by the model can be used to train custom classifiers and detection models for radiology tasks.\n• Scalable Radiology AI Integration: Designed to integrate into Vertex AI medical imaging pipelines, enabling scalable development of radiology analytics systems.",
        features: [
            "Chest X-Ray Analysis",
            "Thoracic Anatomy Vision",
            "Disease Pattern Recognition",
            "Radiology AI Embeddings"
        ],
        bgGradient: "bg-gradient-to-br from-blue-700 to-slate-900"
    },
    {
        agentName: "Geospatial",
        slug: "tool-geospatial-sensing",
        description: "Vision-language foundation model designed for geospatial analysis of aerial and satellite imagery.",
        category: "Geospatial",
        avatar: "/AGENTS_IMG/geospatial-sensing.png",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Imagery – Classification and Retrieval for Remote Sensing is a vision-language foundation model designed for geospatial analysis of aerial and satellite imagery. The model is trained on large-scale remote sensing datasets to learn the relationship between visual geospatial patterns and semantic descriptions.\n\nKey Capabilities:\n• Satellite and Aerial Image Understanding: Ability to interpret complex visual structures present in remote sensing imagery, including landforms, infrastructure, vegetation patterns, and environmental features.\n• Zero-Shot Image Classification: Supports classification of geospatial imagery into semantic categories without requiring additional model training.\n• Geospatial Image Retrieval: Enables efficient search and retrieval of satellite images based on visual similarity or semantic queries.\n• Vision–Language Alignment: Maps geospatial imagery and textual descriptions into a shared embedding space, enabling cross-modal understanding of geographic data.\n• High-Dimensional Image Embeddings: Generates dense feature representations of satellite imagery that capture spatial patterns and environmental structures.\n• Scalable Remote Sensing Analysis: Designed to integrate with large-scale geospatial AI pipelines, supporting high-volume satellite data processing and geographic intelligence systems.",
        features: [
            "Satellite Vision",
            "Zero-Shot Classify",
            "Image Retrieval",
            "Geospatial Analytics"
        ],
        bgGradient: "bg-gradient-to-br from-indigo-800 to-blue-900"
    },

    // Utilities / Others
    // --- WORKSPACE AGENTS ---
    {
        agentName: "AIHEALTH",
        slug: "tool-aihealth",
        description: "Personal Wellness and Diagnostic Suite. Analyze symptoms, track metrics, and run health automation routines.",
        category: "Medical & Health AI",
        avatar: "",
        status: "Live",
        provider: "google",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Your digital mini-doctor. Input your symptoms, upload medical reports for simple-language summaries, generate wellness plans, and automate health monitoring.",
        features: ["Symptom Checker", "Report Analyzer", "Mental Health Support", "Automated Routines"],
        bgGradient: "bg-gradient-to-br from-pink-500 to-rose-500"
    },
    {
        agentName: "AIWRITE",
        slug: "tool-aiwrite",
        description: "AI-Powered Content Generation and Curation Workspace. Create marketing copy and optimize text efficiently.",
        category: "Sales & Marketing",
        avatar: "",
        status: "Live",
        provider: "openai",
        pricingModel: "Free",
        pricing: { type: "Free", plans: [] },
        fullDesc: "Scale your content creation dramatically. Provides an intelligent manuscript editor, blog generator, SEO optimizer, and multi-format conversion suite.",
        features: ["Copywriting", "SEO Optimization", "Content Refining", "Manuscript Editing"],
        bgGradient: "bg-gradient-to-br from-fuchsia-500 to-pink-600"
    },
];

export const seedTools = async () => {
    try {
        const forcedOrderSlugs = [
            // Workspace Agents First
            'tool-aihealth',
            'tool-aiwrite',
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
            'tool-image-understanding-claude',
            'tool-pixel-segmentor-sam',
            'tool-pathology-medgemma',
            'tool-derm-foundation',
            'tool-cxr-foundation',
            'tool-geospatial-sensing',
            // Others
            // Deleted Tools (Keep in deletion list)
            'tool-marketing-agency',
            'tool-customer-service',
            'tool-academic-research',
            'tool-bug-assistant',
            'tool-travel-concierge',
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
        await agentModel.deleteMany({ slug: { $in: ['tool-aibiz', 'tool-aihire', 'tool-aisales', 'tool-aidesk'] } });
        await agentModel.deleteMany({ slug: { $in: forcedOrderSlugs } });
        console.log("[SEED] Reset marketplace sequence: OpenAI First, Vertex AI Second.");

        for (const tool of toolsToSeed) {
            // Force delete before upsert to ensure all fields are fresh and no duplicates exist
            await agentModel.deleteOne({ slug: tool.slug });

            await agentModel.findOneAndUpdate(
                { slug: tool.slug },
                { $set: tool },
                { upsert: true, new: true }
            );
            if (tool.slug === 'tool-code-writer') {
                console.log(`[SEED] Re-seeded tool-code-writer. Description: ${tool.description.substring(0, 30)}...`);
            }
            console.log(`[SEED] Ensured tool: ${tool.agentName}`);
        }
        console.log("[SEED] Tools re-sequencing complete.");
    } catch (error) {
        console.error("[SEED ERROR]", error);
    }
};
