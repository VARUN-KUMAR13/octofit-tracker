import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const hostUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl: hostUrl });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${hostUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:', error);
    process.exit(1);
  });
