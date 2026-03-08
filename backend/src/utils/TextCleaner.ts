/**
 * TextCleaner.ts
 * Cleans extracted text by normalizing whitespaces, formatting issues, and encoding artifacts.
 */

export class TextCleaner {
  public static clean(rawText: string): string {
    return rawText
      // Remove backspace characters / weird control chars
      .replace(/[\b\x00-\x09\x0B-\x0C\x0E-\x1F\x7F]/g, '')
      // Replace non-breaking spaces with regular space
      .replace(/\u00A0/g, ' ')
      // Merge multiple spaces into one
      .replace(/[ \t]+/g, ' ')
      // Merge multiple newlines into 1 or 2
      .replace(/\n\s*\n\s*\n+/g, '\n\n')
      .trim();
  }
}
