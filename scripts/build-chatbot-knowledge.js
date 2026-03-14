import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to scan
const PAGES_DIR = path.resolve(__dirname, '../src/pages');
const OUTPUT_FILE = path.resolve(__dirname, '../data/chatbot-knowledge.json');

// Simple regex to strip JSX tags and imports, keeping mostly text
function extractTextFromJSX(content) {
  // Remove imports and exports
  let text = content.replace(/import\s+.*?;/g, '');
  text = text.replace(/export\s+.*?;/g, '');
  
  // Remove className, style and other JSX attributes
  text = text.replace(/[a-zA-Z]+=\{.*?\}/g, '');
  text = text.replace(/[a-zA-Z]+=".*?"/g, '');
  
  // Remove JSX tags, keep inner content
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Clean up extra whitespace and newlines
  text = text.replace(/\s+/g, ' ').trim();
  
  // Remove common code artifacts
  text = text.replace(/const\s+\w+\s*=\s*\(\)\s*=>\s*\{/g, '');
  text = text.replace(/return\s*\(/g, '');
  
  return text;
}

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function buildKnowledgeBase() {
  console.log('Building Chatbot Knowledge Base...');
  
  const files = scanDirectory(PAGES_DIR);
  const knowledgeChunks = [];
  
  for (const file of files) {
    // Generate route path from file path
    let route = file.replace(PAGES_DIR, '').replace('.tsx', '').replace('.ts', '').replace('/index', '');
    if (route === '') route = '/';
    
    // Convert path to human readable title
    const titleSegments = route.split('/').filter(Boolean);
    const title = titleSegments.length > 0 
      ? titleSegments.map(s => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(' - ')
      : 'Homepage';
      
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const text = extractTextFromJSX(content);
      
      // Only keep significant chunks of text
      if (text.length > 100) {
        // Split into chunks if text is very long (rough chunking)
        const chunkSize = 1500;
        for (let i = 0; i < text.length; i += chunkSize) {
          knowledgeChunks.push({
            id: `${route}_${i}`,
            title,
            route,
            content: text.substring(i, i + chunkSize)
          });
        }
      }
    } catch (e) {
      console.warn(`Could not read file ${file}:`, e.message);
    }
  }
  
  // Also add some explicit structural knowledge based on the user's prompt
  knowledgeChunks.push({
    id: "contact_info_hardcoded",
    title: "Official Contact Information",
    route: "/contact",
    content: "Guide IT Solutions official contact info: WhatsApp: +91 8884162999, Email: info@guideitsol.com, Website: https://www.guideitsol.com, Book a meeting via Calendly: https://calendly.com/guideitsol."
  });
  
  const dataDir = path.resolve(__dirname, '../src/lib');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  
  const outputFile = path.resolve(__dirname, '../src/lib/chatbot-knowledge.json');
  fs.writeFileSync(outputFile, JSON.stringify(knowledgeChunks, null, 2));
  console.log(`Knowledge Base Generation Complete. Generated ${knowledgeChunks.length} chunks.`);
  console.log(`Saved to ${outputFile}`);
}

buildKnowledgeBase();
