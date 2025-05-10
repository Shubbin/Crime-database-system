import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import policeRoutes from './routes/police.routes.js';
import criminalRoutes from './routes/criminal.routes.js';
import { authenticateUser } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use(authenticateUser); // Apply authentication middleware globally
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/police', policeRoutes);
app.use('/api/criminals', criminalRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));