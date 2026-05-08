/**
 * PdfParser.ts
 * Utility to extract text from an uploaded PDF buffer.
 */
import pdfParse from 'pdf-parse';

export class PdfParser {
  /**
   * Parses text from a PDF buffer.
   * @param buffer PDF file buffer
   * @returns Extracted text as a string
   */
  public static async parse(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      // Clean up common bad characters and excessive whitespace
      return data.text.replace(/\n\s*\n/g, '\n').trim();
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF document.');
    }
  }
}
