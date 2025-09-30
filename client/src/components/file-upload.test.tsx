import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import FileUpload from './file-upload';
import { TooltipProvider } from '@/components/ui/tooltip';
import * as parser from '@/lib/conversation-parser';
import * as calculator from '@/lib/water-calculator';

vi.mock('jszip', () => {
  class MockZip {
    static async loadAsync(_file: any) {
      return new MockZip();
    }
    file(_regex: RegExp) {
      // Always return a conversations.json entry with minimal valid content
      return [
        {
          async: async (_type: string) =>
            JSON.stringify([
              {
                mapping: {
                  a: {
                    message: {
                      id: 'a',
                      author: { role: 'user' },
                      content: { parts: ['Hello from zip'] },
                      create_time: 1700000000,
                    },
                  },
                },
              },
            ]),
        },
      ];
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

    const { container } = render(
      <TooltipProvider>
        <FileUpload onAnalysisComplete={onComplete} />
      </TooltipProvider>
    );
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

    const { container } = render(
      <TooltipProvider>
        <FileUpload onAnalysisComplete={onComplete} />
      </TooltipProvider>
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const zipFile: any = { name: 'chatgpt-export.zip', type: 'application/zip' };
    await act(async () => {
      await fireEvent.change(input, { target: { files: [zipFile] } });
    });

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });
});


