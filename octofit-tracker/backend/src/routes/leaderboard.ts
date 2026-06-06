import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().lean();
  const leaderboard = activities
    .reduce<Record<string, number>>((acc, activity) => {
      acc[activity.user] = (acc[activity.user] || 0) + activity.calories;
      return acc;
    }, {});

  const sorted = Object.entries(leaderboard)
    .map(([user, calories]) => ({ user, calories }))
    .sort((a, b) => b.calories - a.calories);

  res.json(sorted);
});

export default router;
