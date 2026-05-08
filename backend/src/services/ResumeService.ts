/**
 * ResumeService.ts
 * Handles business logic wrapper around uploading, parsing, and persisting resume data.
 */
import { PdfParser } from '../utils/PdfParser';
import { DocxParser } from '../utils/DocxParser';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export class ResumeService {
  /**
   * Processes an uploaded file buffer, parses it, and queues for analysis.
   */
  public async processUpload(userId: string, file: Express.Multer.File): Promise<{ resumeId: string; textPreview: string }> {
    let rawText = '';

    if (file.mimetype === 'application/pdf') {
      rawText = await PdfParser.parse(file.buffer);
    } else if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      file.mimetype === 'application/msword'
    ) {
      rawText = await DocxParser.parse(file.buffer);
    } else {
      throw new Error('Unsupported file format. Please upload PDF or DOCX.');
    }

    if (!rawText || rawText.length < 50) {
      throw new Error('Could not extract sufficient text from the document. Please ensure it is not a scanned image.');
    }

    // In a real scenario, you would upload the Buffer/File to S3 here and securely store the URL.
    const fileUrl = 'https://s3.mock.url/resume.pdf';

    /*
    // Persist basic DB record
    const resume = await prisma.resume.create({
      data: {
        userId,
        fileUrl,
        parsedText: rawText
      }
    });

    // Option: push job to Redis/BullMQ queue here
    // await AnalysisQueue.add('analyze-resume', { resumeId: resume.id, text: rawText });

    return { resumeId: resume.id, textPreview: rawText.substring(0, 200) + '...' };
    */

    // Mock response for scaffolding
    const mockResumeId = 'resume-id-1234';
    return {
      resumeId: mockResumeId,
      textPreview: rawText.substring(0, 200) + '...'
    };
  }
}
