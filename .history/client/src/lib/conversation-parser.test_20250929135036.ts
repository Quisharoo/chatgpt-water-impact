import { describe, it, expect } from 'vitest';
import { parseConversationFile } from './conversation-parser';

const sampleMappingArray = JSON.stringify([
  {
    id: 'c1',
    mapping: {
      a: { message: { id: 'a', author: { role: 'user' }, content: { parts: ['Hello'] }, create_time: 1700000000 } },
      b: { message: { id: 'b', author: { role: 'assistant' }, content: { parts: ['Hi there'] }, create_time: 1700000010 } },
      c: { message: null },
    },
  },
  {
    id: 'c2',
    mapping: {
      d: { message: { id: 'd', author: { role: 'user' }, content: { parts: ['Another'] }, create_time: 1700001000 } },
    },
  },
]);

const sampleDirectArray = JSON.stringify([
  { id: 'm1', author: { role: 'user' }, content: { parts: ['Content 1'] }, create_time: 1700100000 },
  { id: 'm2', author: { role: 'assistant' }, content: { parts: ['Content 2'] }, create_time: 1700100100 },
]);

const sampleMessagesProp = JSON.stringify({
  messages: [
    { id: 'x1', author: { role: 'user' }, content: { parts: ['Msg'] }, create_time: 1700200000 },
  ],
});

describe('parseConversationFile', () => {
  it('parses array of conversations with mapping', () => {
    const res = parseConversationFile(sampleMappingArray);
    expect(res.totalMessages).toBe(3);
    expect(res.messages[0].content.parts[0]).toContain('Hello');
    expect(res.dateRange.start instanceof Date).toBe(true);
  });

  it('parses direct array of messages', () => {
    const res = parseConversationFile(sampleDirectArray);
    expect(res.totalMessages).toBe(2);
    expect(res.messages[1].content.parts[0]).toContain('Content 2');
  });

  it('parses object with messages property', () => {
    const res = parseConversationFile(sampleMessagesProp);
    expect(res.totalMessages).toBe(1);
    expect(res.messages[0].author.role).toBe('user');
  });

  it('throws on invalid json', () => {
    expect(() => parseConversationFile('{')).toThrow(/Invalid JSON/);
  });

  it('throws when no messages found', () => {
    const bad = JSON.stringify({});
    expect(() => parseConversationFile(bad)).toThrow(/No messages/);
  });
});


