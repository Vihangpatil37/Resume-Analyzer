/**
 * analysisRoutes.ts
 * Express Router linking controllers to endpoints for Analysis operations.
 */
import { Router } from 'express';
import { AnalysisController } from '../controllers/AnalysisController';

const router = Router();

// Trigger an analysis job
router.post('/:resumeId/run', AnalysisController.runAnalysis);

// Fetch recommendations directly for a specific resume
router.get('/:resumeId/recommendations', AnalysisController.getRecommendations);

export default router;
