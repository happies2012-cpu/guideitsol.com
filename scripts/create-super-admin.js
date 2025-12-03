import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createSuperAdmin() {
  try {
    const email = process.env.GUIDESOFT_SUPERADMIN_EMAIL || 'admin@guidesoft.com';
    const password = process.env.GUIDESOFT_SUPERADMIN_PASS || 'Guidesoft@123';
    const name = process.env.GUIDESOFT_SUPERADMIN_NAME || 'Guidesoft Admin';

    // Check if super admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('Super admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create super admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'SUPER_ADMIN'
      }
    });

    console.log('Super admin user created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();
