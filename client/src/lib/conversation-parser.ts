import { ConversationMessage } from "@shared/schema";

export interface ParsedConversation {
  messages: ConversationMessage[];
  totalMessages: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export function parseConversationFile(jsonContent: string): ParsedConversation {
  try {
    const data = JSON.parse(jsonContent);
    
    // Validate the structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid JSON structure');
    }

    // Extract messages from various possible structures
    let messages: any[] = [];
    
    if (Array.isArray(data)) {
      messages = data;
    } else if (data.messages && Array.isArray(data.messages)) {
      messages = data.messages;
    } else if (data.data && Array.isArray(data.data)) {
      messages = data.data;
    } else {
      // Try to find any array property that looks like messages
      const possibleArrays = Object.values(data).filter(Array.isArray);
      if (possibleArrays.length > 0) {
        messages = possibleArrays[0] as any[];
      } else {
        throw new Error('No messages found in the conversation file');
      }
    }

    if (messages.length === 0) {
      throw new Error('No messages found in the conversation file');
    }

    // Parse and validate messages
    const parsedMessages: ConversationMessage[] = messages
      .filter(msg => msg && typeof msg === 'object')
      .map((msg, index) => ({
        id: msg.id || `msg-${index}`,
        author: {
          role: msg.author?.role || msg.role || 'user'
        },
        content: {
          content_type: msg.content?.content_type || 'text',
          parts: Array.isArray(msg.content?.parts) 
            ? msg.content.parts 
            : msg.content 
            ? [String(msg.content)]
            : msg.message 
            ? [String(msg.message)]
            : ['']
        },
        create_time: msg.create_time || msg.timestamp || msg.created_at || Date.now() / 1000
      }))
      .filter(msg => msg.content.parts.some(part => part && part.trim().length > 0));

    if (parsedMessages.length === 0) {
      throw new Error('No valid messages found in the conversation file');
    }

    // Calculate date range
    const timestamps = parsedMessages.map(msg => msg.create_time * 1000);
    const startDate = new Date(Math.min(...timestamps));
    const endDate = new Date(Math.max(...timestamps));

    return {
      messages: parsedMessages,
      totalMessages: parsedMessages.length,
      dateRange: {
        start: startDate,
        end: endDate
      }
    };

  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON file. Please ensure you uploaded a valid conversation.json file.');
    }
    throw error;
  }
}
