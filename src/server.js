import express from 'express';
// import helmet from 'helmet';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import noteRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const PORT =
  process.env.PORT && process.env.PORT.trim() !== ''
    ? Number(process.env.PORT)
    : 3000;
const app = express();
app.use(express.json());
app.use(cors());
// app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));

app.use(logger);

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});
app.use(authRoutes);
app.use(noteRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on:${PORT}`);
});
