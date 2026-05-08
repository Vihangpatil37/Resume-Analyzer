/**
 * index.ts
 * Main entry point and API route definitions for the Resume Analyzer Backend
 */
import express from 'express';
// In a real app, you would add CORS here
import cors from 'cors';

import resumeRoutes from './routes/resumeRoutes';
import analysisRoutes from './routes/analysisRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// --- Authentication Routes ---
app.post('/api/auth/register', (req, res) => {
  res.json({ message: "User registered" });
});
app.post('/api/auth/login', (req, res) => {
  res.json({ token: "jwt_token_here" });
});

// --- Mount Routers ---
app.use('/api/resume', resumeRoutes);
app.use('/api/analysis', analysisRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
