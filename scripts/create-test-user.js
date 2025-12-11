import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createTestUser() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    if (args.length < 3) {
      console.log('Usage: node create-test-user.js <email> <password> <name> [role]');
      console.log('Example: node create-test-user.js testuser@example.com testpass123 "Test User" USER');
      process.exit(1);
    }

    const email = args[0];
    const password = args[1];
    const name = args[2];
    const role = args[3] || 'USER'; // Default to USER role

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log(`User with email ${email} already exists:`);
      console.log({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });

    console.log('Test user created successfully:');
    console.log({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      password: password // Showing plaintext password for testing purposes only
    });

  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();