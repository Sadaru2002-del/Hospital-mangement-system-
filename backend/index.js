import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// Load environmental variables
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Standard middlewares
app.use(cors());
app.use(express.json());

// Routes mapping
app.use('/api/users', userRoutes);

// Root route status check
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Hospital Management System API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
