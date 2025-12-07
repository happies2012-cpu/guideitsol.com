import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const result = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const values = [];
    let current = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current.trim());
    result.push(values);
  }
  
  return result;
}

async function main() {
  console.log('🌱 Seeding course categories...');
  
  // Read the CSV file
  const csvPath = path.join(__dirname, '../src/assets/all_course_categories.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(csvContent);
  
  // Skip header row
  const categories = rows.slice(1);
  
  console.log(`Found ${categories.length} categories to import`);
  
  let importedCount = 0;
  let skippedCount = 0;
  
  for (const row of categories) {
    if (row.length < 4) {
      skippedCount++;
      continue;
    }
    
    const [id, name, icon, color, createdAt] = row;
    
    if (!name || !icon) {
      skippedCount++;
      continue;
    }
    
    try {
      await prisma.courseCategories.upsert({
        where: { id: id || undefined },
        update: {
          name,
          icon,
          color: color || '#4CAF50',
        },
        create: {
          id,
          name,
          icon,
          color: color || '#4CAF50',
        },
      });
      importedCount++;
      
      if (importedCount % 20 === 0) {
        console.log(`  Imported ${importedCount} categories...`);
      }
    } catch (error) {
      console.error(`  Error importing category "${name}":`, error.message);
      skippedCount++;
    }
  }
  
  console.log(`\n✅ Seeding completed!`);
  console.log(`  Imported: ${importedCount} categories`);
  console.log(`  Skipped: ${skippedCount} entries`);
  
  // Get total count
  const totalCategories = await prisma.courseCategories.count();
  console.log(`  Total categories in database: ${totalCategories}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
