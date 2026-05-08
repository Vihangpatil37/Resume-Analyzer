/**
 * ATSScoringService.ts
 * Deterministic scoring algorithm logic.
 */

export interface ResumeData {
  text: string;
  experienceText: string;
  skills: string[];
  sections: string[];
  hasProjects: boolean;
  hasTablesOrImages: boolean;
  aiGrammarScore: number;
}

export class ATSScoringService {
  public calculateATSScore(resumeData: ResumeData, jdKeywords: string[]): number {
    let score = 0;

    // 1. Keyword Match (30 points)
    const resumeText = resumeData.text.toLowerCase();
    const foundKeywords = jdKeywords.filter(kw => resumeText.includes(kw.toLowerCase()));
    const keywordScore = jdKeywords.length > 0 
      ? Math.min((foundKeywords.length / jdKeywords.length) * 30, 30)
      : 0;
    score += keywordScore || 0;

    // 2. Skills Coverage (20 points)
    const skillCount = resumeData.skills.length;
    score += Math.min((skillCount / 15) * 20, 20); 

    // 3. Experience Evidence (15 points)
    const hasMetrics = /\d+%|\$\d+|\d+x/g.test(resumeData.experienceText);
    score += hasMetrics ? 15 : 5;

    // 4. Project Quality (10 points)
    score += resumeData.hasProjects ? 10 : 0;

    // 5. Section Completeness (10 points)
    const requiredSections = ['summary', 'skills', 'experience', 'education'];
    let sectionScore = 0;
    requiredSections.forEach(sec => {
      if (resumeData.sections.includes(sec)) sectionScore += 2.5;
    });
    score += sectionScore;

    // 6. Formatting Quality (10 points)
    const bulletCount = (resumeData.text.match(/•|- /g) || []).length;
    if (bulletCount > 5) score += 5;
    if (!resumeData.hasTablesOrImages) score += 5;

    // 7. Grammar & Clarity (5 points)
    score += resumeData.aiGrammarScore || 5;

    return Math.round(score);
  }
}
