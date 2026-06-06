import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  duration: { type: Number, required: true }
});

const Workout = model('Workout', workoutSchema);
export default Workout;
