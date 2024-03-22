import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { SessionData } from '../bot/telegraf-context';

export interface IUser extends Document {
  name: string;
  userId: string;
  lettersCount: number,
  notifications: boolean,
  learnedLetters: number[]
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  lettersCount: Number,
  notifications: Boolean,
  learnedLetters: [Number]
});

const User = mongoose.model<IUser>('User', schema);

export default User;