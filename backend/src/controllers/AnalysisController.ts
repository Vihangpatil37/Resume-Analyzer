/**
 * AnalysisController.ts
 * Controller to handle triggering AI analysis pipelines.
 */
import { Request, Response } from 'express';
import { PromptService } from '../ai/prompts/PromptPipeline';
import { ATSScoringService } from '../services/ATSScoringService';
import { JobMatchService } from '../services/JobMatchService';
import { RecommendationService } from '../services/RecommendationService';

const promptService = new PromptService();
const scoringService = new ATSScoringService();
const jobMatchService = new JobMatchService();
const recommendationService = new RecommendationService();

export class AnalysisController {
  public static async runAnalysis(req: Request, res: Response): Promise<void> {
    const { resumeId } = req.params;
    const { jobDescriptionText, jdKeywords } = req.body;

    // Simulated Fetch of Resume Text from DB:
    // const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    const mockRawText = "Example resume text...";

    try {
      // 1. Run LLM extraction pipeline
      const aiResults = await promptService.executePipeline(mockRawText, jobDescriptionText || "");

      // 2. Score ATS compatibility
      const resumeDataParams = {
        text: mockRawText,
        experienceText: JSON.stringify(aiResults.structure.experience || []),
        skills: aiResults.skills.skills || [],
        sections: Object.keys(aiResults.structure).filter(k => aiResults.structure[k] !== null),
        hasProjects: !!aiResults.structure.projects,
        hasTablesOrImages: false, // In reality, parser flags this
        aiGrammarScore: 4 // Usually parsed from prompt evaluation
      };

      const atsScore = scoringService.calculateATSScore(resumeDataParams, jdKeywords || []);

      // 3. (Optional) Run Job Matching if JD is provided
      let matchScore = null;
      if (jobDescriptionText && jdKeywords) {
         const matchInfo = await jobMatchService.calculateMatch(aiResults.skills.skills, mockRawText, jobDescriptionText, jdKeywords);
         matchScore = matchInfo.matchScore;
      }

      // Save to database
      /*
      await prisma.analysisResult.create({
        data: {
          resumeId: resumeId,
          atsScore: atsScore,
          jobMatchScore: matchScore,
          skills: aiResults.skills.skills,
          sections: resumeDataParams.sections,
          analysisJson: aiResults.recommendations
        }
      });
      */

      res.status(200).json({ 
        message: 'Analysis completed successfully',
        atsScore,
        matchScore,
        status: 'completed' 
      });

    } catch (error: any) {
      console.error('Analysis Error:', error);
      res.status(500).json({ error: 'Failed to complete analysis pipeline.' });
    }
  }

  public static async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const { resumeId } = req.params;
      const recs = await recommendationService.getRecommendations(resumeId);
      res.status(200).json(recs);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to retrieve recommendations.' });
    }
  }
}
