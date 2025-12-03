import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupProduction() {
  try {
    console.log('Setting up production environment...');

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('Created data directory');
    }

    // Generate Prisma client
    console.log('Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    // Run database migrations
    console.log('Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Create super admin user
    console.log('Creating super admin user...');
    execSync('node scripts/create-super-admin.js', { stdio: 'inherit' });

    console.log('Production setup completed successfully!');

  } catch (error) {
    console.error('Error during production setup:', error);
    process.exit(1);
  }
}

setupProduction();
