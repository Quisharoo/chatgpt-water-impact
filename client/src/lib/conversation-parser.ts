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

    // Debug logging to understand file structure
    console.log('File structure detected:', {
      isArray: Array.isArray(data),
      hasMessages: !!data.messages,
      hasData: !!data.data,
      hasMapping: !!data.mapping,
      topLevelKeys: Object.keys(data),
      messageCount: data.messages?.length || data.data?.length || (data.mapping ? Object.keys(data.mapping).length : 0)
    });

    // Extract messages from various possible structures
    let messages: any[] = [];
    
    if (Array.isArray(data)) {
      messages = data;
    } else if (data.messages && Array.isArray(data.messages)) {
      messages = data.messages;
    } else if (data.data && Array.isArray(data.data)) {
      messages = data.data;
    } else if (data.mapping && typeof data.mapping === 'object') {
      // Handle ChatGPT export format with mapping structure
      const mappingValues = Object.values(data.mapping) as any[];
      messages = mappingValues
        .filter(item => item && item.message)
        .map(item => item.message);
    } else {
      // Try to find any array property that looks like messages
      const possibleArrays = Object.values(data).filter(Array.isArray);
      if (possibleArrays.length > 0) {
        messages = possibleArrays[0] as any[];
      } else {
        throw new Error('No messages found in the conversation file. Supported formats: messages array, mapping object, or direct array.');
      }
    }

    if (messages.length === 0) {
      throw new Error('No messages found in the conversation file');
    }

    // Parse and validate messages
    const parsedMessages: ConversationMessage[] = messages
      .filter(msg => msg && typeof msg === 'object')
      .map((msg, index) => {
        // Handle different message structures
        let messageContent = '';
        let messageRole = 'user';
        let messageTime = Date.now() / 1000;

        // Extract content from various formats
        if (msg.content) {
          if (typeof msg.content === 'string') {
            messageContent = msg.content;
          } else if (msg.content.parts && Array.isArray(msg.content.parts)) {
            messageContent = msg.content.parts.filter((part: any) => part && typeof part === 'string').join(' ');
          } else if (msg.content.text) {
            messageContent = msg.content.text;
          } else if (typeof msg.content === 'object' && msg.content !== null) {
            // Handle nested content objects
            const contentValues = Object.values(msg.content);
            const textContent = contentValues.find((val: any) => typeof val === 'string' && val.trim().length > 0);
            if (textContent) {
              messageContent = String(textContent);
            }
          }
        } else if (msg.message) {
          if (typeof msg.message === 'string') {
            messageContent = msg.message;
          } else if (msg.message.content) {
            messageContent = String(msg.message.content);
          }
        } else if (msg.text) {
          messageContent = String(msg.text);
        } else if (msg.body) {
          messageContent = String(msg.body);
        }

        // Extract role
        if (msg.author?.role) {
          messageRole = msg.author.role;
        } else if (msg.role) {
          messageRole = msg.role;
        } else if (msg.sender) {
          messageRole = msg.sender;
        }

        // Extract timestamp
        if (msg.create_time) {
          messageTime = msg.create_time;
        } else if (msg.timestamp) {
          messageTime = msg.timestamp;
        } else if (msg.created_at) {
          messageTime = typeof msg.created_at === 'string' ? new Date(msg.created_at).getTime() / 1000 : msg.created_at;
        }

        return {
          id: msg.id || `msg-${index}`,
          author: {
            role: messageRole
          },
          content: {
            content_type: 'text',
            parts: messageContent ? [messageContent] : ['']
          },
          create_time: messageTime
        };
      })
      .filter(msg => {
        const hasContent = msg.content.parts.some((part: string) => part && part.trim().length > 0);
        return hasContent;
      });

    if (parsedMessages.length === 0) {
      throw new Error('No valid messages with content found in the conversation file. Please check the file format.');
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
