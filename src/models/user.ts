import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  userId: string;
  lettersCount: number,
  notifications: boolean,
  learnedLetters: string[]
}

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  lettersCount: Number,
  notifications: Boolean,
  learnedLetters: [String]
});

const User = mongoose.model<IUser>('User', schema);

export default User;