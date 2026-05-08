/**
 * DocxParser.ts
 * Utility to extract text from an uploaded DOCX buffer.
 */
import mammoth from 'mammoth';

export class DocxParser {
  /**
   * Parses raw text from a DOCX buffer.
   * @param buffer DOCX file buffer
   * @returns Extracted text as a string
   */
  public static async parse(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value.replace(/\n\s*\n/g, '\n').trim();
    } catch (error) {
      console.error('Error parsing DOCX:', error);
      throw new Error('Failed to parse DOCX document.');
    }
  }
}
