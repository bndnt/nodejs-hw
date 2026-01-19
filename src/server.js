import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { pinoHttpLogger } from './middleware/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundMiddleware } from './middleware/notFoundHandler.js';
import noteRoutes from './routes/notesRoutes.js';

const PORT =
  process.env.PORT && process.env.PORT.trim() !== ''
    ? Number(process.env.PORT)
    : 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(pinoHttpLogger);

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});
app.use(noteRoutes);

app.use(notFoundMiddleware);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on:${PORT}`);
});
