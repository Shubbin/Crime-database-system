import bcrypt from 'bcryptjs';
import { Admin } from '../models/admin.models.js';
import { connectDB } from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin account already exists.');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash('welcome123.', 10);

    const admin = new Admin({
      fullname: 'Makinde olasubomi',
      email: 'makindeolasubmomi2@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });

    await admin.save();
    console.log('Admin account created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin account:', error.message);
    process.exit(1);
  }
};

createAdmin();