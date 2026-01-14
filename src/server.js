import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import 'dotenv/config';

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
);

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on:${PORT}`);
});
