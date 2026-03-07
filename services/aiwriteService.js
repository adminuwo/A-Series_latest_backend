import vertexService from "./vertex.service.js";

/**
 * Builds a dynamic prompt based on segment, type and user inputs
 */
const buildPrompt = (segment = 'agencies', type, inputs = {}) => {
  const safeInputs = inputs || {};

  // Safety derivation for prompt variables
  const monthName = safeInputs.month || 'Selected Month';
  const monthShort = typeof monthName === 'string' && monthName.length >= 3 ? monthName.substring(0, 3) : 'Day';
  const platform = (safeInputs.platforms && Array.isArray(safeInputs.platforms) && safeInputs.platforms.length > 0)
    ? safeInputs.platforms[0]
    : (typeof safeInputs.platforms === 'string' ? safeInputs.platforms : 'Instagram');

  if (type === 'advanced_refinement') {
    const tabContext = safeInputs.tab === 'headlines'
      ? 'Focus specifically on generating or improving high-converting hooks, catchy headlines, and scrolls-stopping titles.'
      : 'Generate distinct variations and alternative versions of the existing content with different tones or perspectives.';

    return `YOU ARE THE WORLD'S TOP CONTENT EDITOR AND STRATEGIST.
    TASK: Refine the provided content based on specific tags and instructions.
    
    CURRENT CONTENT TO REFINE:
    ${JSON.stringify(safeInputs.currentContent, null, 2)}
    
    REFINEMENT STRATEGY:
    - Focus Area: ${tabContext}
    - Tags to Apply: ${safeInputs.tags ? safeInputs.tags.join(', ') : 'General Polish'}
    - User Instructions: ${safeInputs.prompt || 'Optimize and enhance the content based on the tags.'}
    
    MANDATORY RULES:
    1. STRUCTURE INTEGRITY: You MUST return the result in the EXACT same JSON structure (keys and nesting) as the original content.
    2. CONTENT ENHANCEMENT: Improve the quality, tone, and engagement of all text values based on the refinement strategy.
    3. NO TRUNCATION: If refining a calendar or list, process all items.
    4. Return ONLY valid JSON. No markdown wrappers.`;
  }

  let prompt = `You are a high-performance AI Content Engine for ${segment.toUpperCase()} professionals. 
    Your mission is to generate contextually perfect, high-converting, and structurally sound content for the feature: "${type}".
    
    SYSTEM CONTEXT:
    User is using the Vertex AI API for specialized writing.
    The response MUST be a JSON object that adheres EXACTLY to the structure defined below for each feature.
    
    USER INPUT DATA:
    ${JSON.stringify(safeInputs, null, 2)}
    
    INSTRUCTIONS:
    1. STRICT JSON: Return ONLY a valid JSON object. No markdown blocks, no prefix/suffix text.
    2. CONTENT INTEGRITY: Use the tone, word count, and topic provided in the input data above.
    3. SEGMENT-SPECIFIC RULES:

    --- SEGMENT: STUDENTS ---
    - assignment_writer: Return: { "Title": "", "Introduction": "", "Body_Section_1": "", "Body_Section_2": "", "Body_Section_3": "", "Conclusion": "", "References_APA": [] }
    - essay_generator: Return { "Title": "", "Introduction": "", "Main_Content": "", "Conclusion": "" }
    - linkedin_creator: Return { "Post_Content": "", "Hook": "", "Hashtags": [], "Engagement_Question": "" }
    - ppt_generator: Return { "Title_Slide": "", "Outline": [], "Slides": [ { "slide_number": 1, "heading": "", "bullet_points": [] } ] }
    - paraphraser / plagiarism_rewrite: Return { "Original": "", "Rewritten_Content": "", "Anti_Plagiarism_Score": "99%", "Changes_Summary": "" }
    - citation_generator: Return { "Citation": "", "Format_Type": "${safeInputs.isAcademicFormat ? 'APA/MLA' : 'Standard'}", "Bibliography_Entry": "" }

    --- SEGMENT: STARTUPS ---
    - ad_copy: Return: { "Headline": "", "Ad_Copy_Variations": [ { "variation": 1, "text": "" } ], "CTA": "" }
    - landing_copy: Return { "Headline": "", "Sub_Headline": "", "Hero_Section": "", "Features_Benefits": [], "CTA": "" }
    - product_desc: Return { "Product_Name": "", "Tagline": "", "Structured_Description": "", "Key_Features": [] }
    - email_marketing: Return { "Subject_Line": "", "Preview_Text": "", "Email_Body": "", "Call_To_Action": "" }

    --- SEGMENT: FREELANCERS ---
    - proposal_generator: Return { "Title": "", "Executive_Summary": "", "Scope_of_Work": "", "Pricing": "", "Next_Steps": "" }
    - client_email: Return { "Subject": "", "Body": "" }
    - portfolio_desc: Return { "Project_Title": "", "Challenge": "", "Solution": "", "Impact": "" }
    - service_description: Return { "Service_Name": "", "Description": "", "Key_Deliverables": [], "Target_Client": "" }

    --- SEGMENT: INFLUENCERS ---
    - insta_caption: Return: { "Caption": "", "Hashtags": [], "Emoji_Strategy": "" }
    - hashtag_generator: Return { "Niche_Tags": [], "Viral_Tags": [], "Community_Tags": [] }
    - reel_script: Return { "Title": "", "Script": [ { "time": "", "visual": "", "audio": "" } ] }
    - story_ideas: Return { "Ideas": [ { "title": "", "concept": "", "sticker_type": "" } ] }

    --- SEGMENT: AGENCIES ---
    - seo_content: Return { "SEO_Title": "", "Meta_Description": "", "H1": "", "Content": "", "Keywords_Used": [] }
    - content_calendar: 
      GOAL: Generate a bespoke content strategy for ${monthName.toUpperCase()} on the ${platform.toUpperCase()} platform.
      FREQUENCY: ${safeInputs.frequency || 'Daily'}
      STRICT HARD CONSTRAINT: The "date" field MUST use the format "${monthShort} [Day#]".
      FIELD NAMES (CRITICAL): date, phase, platform, postType, format, heading, subHeading, shortCaption, longCaption, hashtags, slideOrReelBreakdown.
      
      Strategy Breakdown:
      - Week 1: Awareness & Pain Points
      - Week 2: Consideration & Social Proof
      - Week 3: Decision & Authority
      - Week 4: Action & FOMO
      
      Return a JSON array under the key "calendar". Do NOT use placeholders like "Viral Hook". Write actual, high-impact content.
      
      SCHEMA:
      {
        "calendar": [
          {
            "date": "${monthShort} 1",
            "phase": "AWARENESS",
            "platform": "${platform}",
            "postType": "Actual Topic",
            "format": "Reel",
            "heading": "Actual catchy hook",
            "subHeading": "Actual descriptive sub-hook",
            "shortCaption": "Punchy short copy",
            "longCaption": "Detailed engaging copy",
            "hashtags": "#viral #branding",
            "slideOrReelBreakdown": "Step by step visual guide"
          }
        ]
      }
      Generate EXACTLY 30 days if frequency is Daily, 12 days if 3x/week, or 4 days if Weekly. Ensure every field is filled with full, non-truncated text.
    - lead_funnel: Generate a lead generation campaign.
      Return: { "Lead_Magnet_Idea": "", "Landing_Page_Copy": { "Headline": "", "Hero": "", "Bullet_Points": [] }, "Follow_Up_Emails": [ { "subject": "", "body": "" } ] }
    - video_scripts: Generate 3 high-impact short-form video scripts (Reels/TikTok/Shorts).
      Return: { "Scripts": [ { "hook": "", "body_points": [], "cta": "", "visual_cues": "" } ] }
    - page_description_generator: Generate complete social media branding content.
      Return: { "Bio_150_Chars": "", "LinkedIn_About_Section": "", "Instagram_Bio": "", "CTA_Lines": [] }
    - bio_generator: Return { "Short_Bio": "", "Professional_Bio": "", "Creative_Bio": "", "Emoji_Style": "" }
    - brand_voice / brand_memory: Return { "Archetype": "", "Tone_Guidelines": "", "Dos_and_Donts": [], "Sample_Mailing_Voice": "" }
    - daily_ideas: Return { "Concept_Title": "", "Target_Platform": "", "Hook": "", "Visual_Idea": "", "Strategy_Note": "" }
    - bulk_blog: Generate 3 SEO-optimized blog outlines.
      Return: { "Blogs": [ { "Title": "", "Outline": [], "Primary_Keywords": [], "Estimated_Wordcount": "" } ] }

    --- SEGMENT: AUTHORS ---
    - poetry_generator: Theme: ${safeInputs.theme}, Mood: ${safeInputs.mood}, Style: ${safeInputs.style}, Rhyme: ${safeInputs.rhyme ? 'Yes' : 'No'}.
      Return: { "Title": "", "Poem_Body": "", "Stanza_Count": 0, "Style_Notes": "" }
    - story: Return structured story: { "Title": "", "Introduction": "", "Conflict": "", "Climax": "", "Resolution": "", "Full_Draft": "" }
    - chapter_continuation: Return: { "Scene_Start": "", "Action_Sequence": "", "Dialogue": "", "Next_Chapter_Hook": "" }
    - manuscript_editor:
      GOAL: Act as a precise proofreader for the uploaded manuscript in ${safeInputs.language || 'English'}.
      STRICT MANDATE: Correct ONLY grammatical errors, punctuation, spelling, and minor flow issues. DO NOT change the story, plot, or distinct creative style.
      CLEANUP RULES: Remove any junk characters, weird symbols, or non-standard arrows (e.g., →, =>, >>) and replace them with standard bullet points (•) or numbered pointers where logical.
      Return JSON: { "Original_Segment": "", "Edited_Segment": "", "Grammar_Fixes_Summary": "", "Style_Improvements": "", "Bilingual_Note": "" }
      RULE: Ensure the "Edited_Segment" contains the full corrected text. Preservation of the original tone is paramount.

    --- UNIVERSAL FEATURES (Applicable to any segment) ---
    - ab_variations: Create two distinct versions (A & B) of the requested content. 
      Structure: { "Version_A": { ...content... }, "Version_B": { ...content... }, "Comparison_Analysis": "Briefly explain the difference in strategy/tone between A and B." }

    FINAL MANDATE:
    If the input contains a custom "wordCount" like ${safeInputs.wordCount}, you MUST respect the depth and length.
    If "isAcademicFormat" is true, strictly follow APA/MLA guidelines for structure and citations.
    Ensure all sections are comprehensive and not placeholder text.
    `;

  return prompt;
};

/**
 * Main function to generate content using the unified AISA backend (VertexService)
 */
export const generateContent = async (segment, type, inputs, mode = 'quality') => {
  try {
    const prompt = buildPrompt(segment, type, inputs);

    console.log(`[AIWRITE] Requesting content via VertexService for ${segment} - ${type}`);

    // Call the unified VertexService (AISA backend)
    const text = await vertexService.askVertex(prompt, null, {
      agentType: 'AIWRITE',
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 8192 // Reverted to 8k limit for stable API compatibility
      }
    });

    if (!text) throw new Error("Empty response from AISA backend");

    try {
      // Robust JSON extraction
      const cleanJson = text.replace(/```json|```/g, '').trim();
      try {
        return JSON.parse(cleanJson);
      } catch (e) {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw e;
      }
    } catch (parseError) {
      console.error("[AIWRITE] Heavy JSON Parse Failure:", parseError.message);
      throw new Error(`AISA failed to return valid JSON for AIWRITE: ${parseError.message}`);
    }
  } catch (error) {
    console.error("AIWRITE Service Error Details:", error);
    throw error;
  }
};

