import { connectDatabase } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';

// Seed the octofit_db database with test data
async function seed() {
  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Bear Climbers', members: 20 },
    { name: 'Ocean Runners', members: 15 },
    { name: 'Sky Sprinters', members: 18 }
  ]);

  const users = await User.create([
    { name: 'Asha Patel', email: 'asha@example.com', team: teams[0]._id.toString() },
    { name: 'Gabriel Chen', email: 'gabriel@example.com', team: teams[1]._id.toString() },
    { name: 'Mia Santos', email: 'mia@example.com', team: teams[2]._id.toString() }
  ]);

  await Activity.create([
    { user: users[0]._id.toString(), type: 'Running', duration: 34, calories: 320, date: new Date() },
    { user: users[1]._id.toString(), type: 'Cycling', duration: 42, calories: 450, date: new Date() },
    { user: users[2]._id.toString(), type: 'Swimming', duration: 28, calories: 280, date: new Date() }
  ]);

  await Workout.create([
    { title: 'HIIT Sprint', focus: 'Cardio', duration: 30 },
    { title: 'Core Builder', focus: 'Strength', duration: 40 },
    { title: 'Yoga Flow', focus: 'Flexibility', duration: 45 }
  ]);

  console.log('Seed data inserted into octofit_db');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
