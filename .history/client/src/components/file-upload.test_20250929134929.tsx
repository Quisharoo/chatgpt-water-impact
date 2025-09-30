import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import FileUpload from './file-upload';
import * as parser from '@/lib/conversation-parser';
import * as calculator from '@/lib/water-calculator';

vi.mock('jszip', () => {
  class MockZip {
    private files: Record<string, string>;
    constructor() {
      this.files = {};
    }
    static async loadAsync(file: File) {
      return new MockZip();
    }
    file(regex: RegExp) {
      // Simulate conversations.json present
      if (/conversations\.json/i.test(regex.toString())) {
        return [{ async: async () => JSON.stringify([{ mapping: {} }]) }];
      }
      return [];
    }
  }
  return { default: MockZip };
});

describe('FileUpload', () => {
  it('accepts and processes a JSON file', async () => {
    const onComplete = vi.fn();
    vi.spyOn(parser, 'parseConversationFile').mockReturnValue({
      messages: [
        {
          id: '1',
          author: { role: 'user' },
          content: { content_type: 'text', parts: ['hi'] },
          create_time: 1700000000,
        },
      ],
      totalMessages: 1,
      dateRange: { start: new Date(1700000000 * 1000), end: new Date(1700000000 * 1000) },
    } as any);
    vi.spyOn(calculator, 'calculateWaterConsumption').mockReturnValue({} as any);

    const { container } = render(<FileUpload onAnalysisComplete={onComplete} /> as any);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const file: any = {
      name: 'conversations.json',
      type: 'application/json',
      text: async () => JSON.stringify({ messages: [] }),
    };
    await act(async () => {
      await fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });

  it('accepts and processes a ZIP file', async () => {
    const onComplete = vi.fn();
    vi.spyOn(parser, 'parseConversationFile').mockReturnValue({
      messages: [
        {
          id: '1',
          author: { role: 'user' },
          content: { content_type: 'text', parts: ['hi'] },
          create_time: 1700000000,
        },
      ],
      totalMessages: 1,
      dateRange: { start: new Date(1700000000 * 1000), end: new Date(1700000000 * 1000) },
    } as any);
    vi.spyOn(calculator, 'calculateWaterConsumption').mockReturnValue({} as any);

    const { container } = render(<FileUpload onAnalysisComplete={onComplete} /> as any);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const zipFile: any = { name: 'chatgpt-export.zip', type: 'application/zip' };
    await act(async () => {
      await fireEvent.change(input, { target: { files: [zipFile] } });
    });

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });
});


