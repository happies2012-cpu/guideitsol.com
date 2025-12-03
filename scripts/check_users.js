import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users in the database`);
    if (users.length > 0) {
      console.log('Users:');
      users.forEach(user => {
        console.log(`- ${user.name} (${user.email}) [${user.role}]`);
      });
    } else {
      console.log('No users found in the database');
    }
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();