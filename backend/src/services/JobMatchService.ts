/**
 * JobMatchService.ts
 * Compares parsed resume properties against a target Job Description.
 */

export class JobMatchService {
  /**
   * Compares JD keywords to Resume keywords to identify matches and gaps.
   */
  public async calculateMatch(resumeSkills: string[], resumeText: string, jdText: string, jdKeywords: string[]): Promise<any> {
    const textLower = resumeText.toLowerCase();
    
    // Exact text matching for JD keywords
    const matchedKeywords = jdKeywords.filter(kw => textLower.includes(kw.toLowerCase()));
    
    // Missing core requirements
    const missingKeywords = jdKeywords.filter(kw => !matchedKeywords.includes(kw));

    // Simple matching percentage calculation (out of 100)
    let matchScore = 0;
    if (jdKeywords.length > 0) {
       matchScore = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
    }
    
    return {
      matchScore,
      matchedKeywords,
      missingKeywords,
      // For a real app, you'd use LLM context matching to assess deeper alignment.
      isGoodMatch: matchScore > 75 
    };
  }
}
