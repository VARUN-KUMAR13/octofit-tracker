import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: { type: Number, required: true }
});

const Team = model('Team', teamSchema);
export default Team;
