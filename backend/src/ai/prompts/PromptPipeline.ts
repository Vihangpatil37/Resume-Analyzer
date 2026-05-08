/**
 * PromptPipeline.ts
 * AI Prompt Pipeline for Resume Analyzer.
 */

export const PROMPTS = {
  // Step 1: Structure Extraction
  STEP_1_STRUCTURE: `
    You are an expert ATS parser. Extract the following sections from this raw resume text:
    Summary, Skills, Experience, Projects, Education. 
    Return pure JSON with these keys in lowercase. If missing, return null.
    Raw Text: {RAW_TEXT}
  `,

  // Step 2: Skill Extraction
  STEP_2_SKILLS: `
    Based on the Experience and Projects sections below, extract a flat JSON list array of all technical 
    frameworks, tools, programming languages, and soft skills mentioned. 
    Return format: { "skills": ["React", "Agile", "Node.js"] }
    Text: {EXPERIENCE_JSON}
  `,

  // Step 3: Job Match
  STEP_3_MATCH: `
    Compare the following resume data against the provided Job Description.
    Return JSON containing: "missing_keywords" (string array), "match_percentage" (number 0-100), and "alignment_summary" (string).
    Resume Data: {RESUME_JSON}
    Job Description: {JD_TEXT}
  `,

  // Step 4: Improvement & Rewrite
  STEP_4_IMPROVE: `
    Identify 3 core weaknesses in this resume targeting the provided job description.
    Refactor the following experience bullet points to use the STAR method and include impact metrics.
    Return JSON format: { "weaknesses": [...], "rewritten_bullets": [...] }
    Resume Experience: {EXPERIENCE_JSON}
    Job Description: {JD_TEXT}
  `
};

export class PromptService {
  // Skeleton implementation for prompt chaining
  async executePipeline(rawText: string, jdText: string) {
    // 1. Extract Structure
    const step1JSON = await this.callLLM(PROMPTS.STEP_1_STRUCTURE.replace('{RAW_TEXT}', rawText));
    
    // 2. Extract Skills
    const step2JSON = await this.callLLM(PROMPTS.STEP_2_SKILLS.replace('{EXPERIENCE_JSON}', JSON.stringify(step1JSON.experience)));
    
    // 3. Match JD
    const step3JSON = await this.callLLM(PROMPTS.STEP_3_MATCH
      .replace('{RESUME_JSON}', JSON.stringify({ ...step1JSON, skills: step2JSON.skills }))
      .replace('{JD_TEXT}', jdText));

    // 4. Improvement & Rewrite
    const step4JSON = await this.callLLM(PROMPTS.STEP_4_IMPROVE
      .replace('{EXPERIENCE_JSON}', JSON.stringify(step1JSON.experience))
      .replace('{JD_TEXT}', jdText));

    return {
      structure: step1JSON,
      skills: step2JSON,
      match: step3JSON,
      recommendations: step4JSON
    };
  }

  private async callLLM(prompt: string): Promise<any> {
    // Mocked LLM call, in reality uses OpenAI/Anthropic/Local LLM API abstraction.
    return {};
  }
}
