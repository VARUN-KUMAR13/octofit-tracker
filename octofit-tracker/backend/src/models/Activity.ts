import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  user: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Activity = model('Activity', activitySchema);
export default Activity;
