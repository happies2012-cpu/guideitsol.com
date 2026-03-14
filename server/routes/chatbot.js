import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load precomputed RAG knowledge base
const KNOWLEDGE_PATH = path.resolve(__dirname, '../../src/lib/chatbot-knowledge.json');
let knowledgeBase = [];

try {
  if (fs.existsSync(KNOWLEDGE_PATH)) {
    knowledgeBase = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, 'utf-8'));
    console.log(`[Chatbot RAG] Loaded ${knowledgeBase.length} knowledge chunks.`);
  } else {
    console.warn('[Chatbot RAG] Knowledge base file not found:', KNOWLEDGE_PATH);
  }
} catch (error) {
  console.error('[Chatbot RAG] Error loading knowledge base:', error);
}

// Simple text cleaner to tokenize terms
const tokenize = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
};

// Extremely fast offline TF/Intersection RAG search engine (No external ML deps)
const searchKnowledgeBase = (query, maxResults = 3) => {
  const queryTokens = new Set(tokenize(query));
  
  if (queryTokens.size === 0) return [];
  
  const scoredChunks = knowledgeBase.map(chunk => {
    let score = 0;
    const chunkContent = chunk.content.toLowerCase();
    const chunkTitleTokens = tokenize(chunk.title);
    
    // Exact phrase bonus if query is a direct substring
    if (chunkContent.includes(query.toLowerCase())) {
      score += 50;
    }
    
    queryTokens.forEach(token => {
      // Bonus if keyword is in the title/route representing the page topic
      if (chunkTitleTokens.includes(token)) score += 10;
      
      // Bonus for frequency in content
      const index = chunkContent.indexOf(token);
      if (index !== -1) {
        score += 2;
        // Count multiple occurrences loosely
        const matches = chunkContent.match(new RegExp(token, 'g'));
        if (matches) score += matches.length;
      }
    });

    return { ...chunk, _score: score };
  });

  // Sort descending by score, filter out chunks with zero score
  const results = scoredChunks.filter(c => c._score > 0).sort((a, b) => b._score - a._score);
  return results.slice(0, maxResults);
};

const SYSTEM_PROMPT_TEMPLATE = `
You are the official AI Assistant for Guide IT Solutions (Guidesoft).
You must answer queries strictly based on the provided context if possible. 
Be polite, professional, and clear. Format your answers in HTML using <br/>, <strong>, <ul>, <li> and <a> tags where appropriate to make it visually appealing in the chat widget.
Do NOT use Markdown markdown, ONLY standard HTML.

<RULES>
1. If the user asks to contact you, ALWAYS provide:
  - WhatsApp: <a href="https://wa.me/918884162999" target="_blank" class="text-green-400 font-semibold hover:underline">WhatsApp (+91 8884162999)</a>
  - Email: <a href="mailto:info@guideitsol.com" class="text-blue-400 font-semibold hover:underline">info@guideitsol.com</a>
2. If the user wants a meeting, demonstration, call or appointment, ALWAYS provide:
  - Booking Calendar: <a href="https://calendly.com/guideitsol" target="_blank" class="text-purple-400 font-semibold hover:underline">Click here to Book a Meeting</a>
3. Keep answers concise. Do not guess.
</RULES>

<CONTEXT_FROM_WEBSITE>
{CONTEXT}
</CONTEXT_FROM_WEBSITE>
`;

// Helper: Attempt to call OpenAI if API key exists, otherwise fallback to offline response
const generateOpenAIResponse = async (userMessage, contextText) => {
  const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{CONTEXT}', contextText);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3,
        max_tokens: 400
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.choices[0].message.content;
  } catch (err) {
    console.error('[OpenAI Error]', err.message);
    throw err; // Trigger offline fallback
  }
};

// Route: POST /api/chatbot/ask
router.post('/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // 1. Vector Search equivalent: RAG from JSON Knowledge Base
  const topChunks = searchKnowledgeBase(message, 4);
  
  if (topChunks.length === 0) {
    topChunks.push({
      title: "Fallback Knowledge",
      content: "Could not find specific details regarding that topic in the local knowledge base. Please reach out to support."
    });
  }

  // Formatting context chunks to feed GPT/LLM
  const contextString = topChunks.map((chunk, index) => 
    `[Source ${index + 1}: ${chunk.title}]\n${chunk.content}`
  ).join('\n\n');

  // 2. Integration with ChatGPT (GPT-4o) if key exists
  if (process.env.OPENAI_API_KEY) {
    try {
      const gptHtmlHtmlResponse = await generateOpenAIResponse(message, contextString);
      return res.json({ response: gptHtmlHtmlResponse, source: 'openai-gpt-4o' });
    } catch (err) {
      // Will gracefully drop through to offline agent if OpenAI fails
      console.warn('OpenAI Failed, failing over back to local offline offline agent...');
    }
  }

  // 3. Fallback: Local RAG Assembly (No API Keys required, 100% Offline RAG match)
  const isMeeting = ["book", "meeting", "call", "appointment", "demo"].some(w => message.toLowerCase().includes(w));
  const isContact = ["contact", "whatsapp", "phone", "email", "reach"].some(w => message.toLowerCase().includes(w));

  let offlineResponse = "";

  if (isContact) {
    offlineResponse += "You can reach our team immediately:<br/>📞 <a href='https://wa.me/918884162999' target='_blank' class='text-green-400 font-semibold hover:underline'>WhatsApp: +91 8884162999</a><br/>📧 <a href='mailto:info@guideitsol.com' class='text-blue-400 hover:underline'>info@guideitsol.com</a><br/><br/>";
  } else if (isMeeting) {
    offlineResponse += "Ready to discuss your project?<br/>📅 <a href='https://calendly.com/guideitsol' target='_blank' class='text-purple-400 font-semibold hover:underline'>Book a Meeting with us here</a><br/><br/>";
  }

  // Construct from best RAG chunk
  if (topChunks[0] && topChunks[0]._score > 0) {
    // If they just asked a normal question, dump the highest ranked snippet context
    const snippet = topChunks[0].content;
    const shortSnippet = snippet.length > 250 ? snippet.substring(0, 250) + '...' : snippet;
    
    offlineResponse += `<strong>From our ${topChunks[0].title} module:</strong><br/><br/>`;
    offlineResponse += `<em>"${shortSnippet}"</em>`;
    offlineResponse += `<br/><br/>For more details, please <a href='https://wa.me/918884162999' target='_blank' class='text-green-400 hover:underline'>chat with us on WhatsApp</a>!`;
  } else if (!isContact && !isMeeting) {
     offlineResponse += `I'm a local AI assistant. To answer that precisely, please <a href='https://calendly.com/guideitsol' target='_blank' class='text-purple-400 hover:underline'>Book a Demo Call</a> or <a href='https://wa.me/918884162999' target='_blank' class='text-green-400 hover:underline'>WhatsApp us</a>!`;
  }

  return res.json({ response: offlineResponse, source: 'offline-local-rag' });
});

export default router;
