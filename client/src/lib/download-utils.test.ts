import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadFile, downloadCSV } from './download-utils';

describe('download-utils', () => {
  let createElementSpy: any;
  let mockAnchor: any;

  beforeEach(() => {
    // Mock anchor element
    mockAnchor = {
      href: '',
      download: '',
      click: vi.fn(),
    };

    // Mock document.createElement
    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);

    // Mock URL methods if they don't exist
    if (!globalThis.URL.createObjectURL) {
      globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    }
    if (!globalThis.URL.revokeObjectURL) {
      globalThis.URL.revokeObjectURL = vi.fn();
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('downloadFile', () => {
    it('creates a blob and triggers download with correct parameters', () => {
      const content = 'test content';
      const filename = 'test.txt';

      downloadFile(content, filename);

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(mockAnchor.download).toBe(filename);
      expect(mockAnchor.click).toHaveBeenCalled();
    });

    it('uses custom MIME type when provided', () => {
      const content = 'csv,content';
      const filename = 'data.csv';
      const mimeType = 'text/csv';

      downloadFile(content, filename, mimeType);

      expect(mockAnchor.click).toHaveBeenCalled();
    });

    it('defaults to text/plain MIME type', () => {
      downloadFile('content', 'file.txt');
      expect(mockAnchor.click).toHaveBeenCalled();
    });
  });

  describe('downloadCSV', () => {
    it('converts rows to CSV format and triggers download', () => {
      const rows = [
        ['Name', 'Age', 'City'],
        ['Alice', 30, 'NYC'],
        ['Bob', 25, 'LA'],
      ];
      const filename = 'data.csv';

      downloadCSV(rows, filename);

      expect(mockAnchor.download).toBe(filename);
      expect(mockAnchor.click).toHaveBeenCalled();
    });

    it('handles empty rows', () => {
      downloadCSV([], 'empty.csv');
      expect(mockAnchor.click).toHaveBeenCalled();
    });

    it('handles single row', () => {
      const rows = [['Header1', 'Header2']];
      downloadCSV(rows, 'single.csv');
      expect(mockAnchor.click).toHaveBeenCalled();
    });
  });
});
