/**
 * Utility functions for downloading files in the browser
 */

/**
 * Triggers a file download with the given content and filename
 * @param content - The content to download
 * @param filename - The name of the file to download
 * @param mimeType - The MIME type of the file (default: 'text/plain')
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Downloads data as a CSV file
 * @param rows - Array of arrays representing CSV rows
 * @param filename - The name of the CSV file to download
 */
export function downloadCSV(rows: (string | number)[][], filename: string): void {
  const csvContent = rows
    .map(row => row.join(','))
    .join('\n');
  
  downloadFile(csvContent, filename, 'text/csv');
}
