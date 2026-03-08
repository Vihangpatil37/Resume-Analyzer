/**
 * ResumeController.ts
 * Express route handlers for Resume endpoints.
 */
import { Request, Response } from 'express';
import { ResumeService } from '../services/ResumeService';

const resumeService = new ResumeService();

export class ResumeController {
  public static async uploadResume(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded.' });
        return;
      }

      // Mock user extraction from JWT middleware
      const mockUserId = (req as any).user?.id || 'mock-user-uuid';
      
      const result = await resumeService.processUpload(mockUserId, req.file);
      
      res.status(201).json({
        message: 'Resume uploaded and queued for processing successfully',
        data: result
      });
    } catch (error: any) {
      console.error('Upload Error:', error);
      res.status(400).json({ error: error.message || 'Error processing the file.' });
    }
  }

  public static async getResume(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // const resume = await prisma.resume.findUnique({ where: { id }});
      
      res.status(200).json({ 
        id, 
        message: 'Returning mock resume record', 
        status: 'completed' 
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to retrieve resume.' });
    }
  }
}
