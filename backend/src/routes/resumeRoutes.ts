/**
 * resumeRoutes.ts
 * Express Router linking controllers to endpoints for Resume operations.
 */
import { Router } from 'express';
import multer from 'multer';
import { ResumeController } from '../controllers/ResumeController';

const router = Router();

// Configure multer to store files in memory for processing
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/upload', upload.single('resume'), ResumeController.uploadResume);
router.get('/:id', ResumeController.getResume);

export default router;
