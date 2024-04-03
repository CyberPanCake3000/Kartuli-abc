import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface LearnedLetter{
  character: string,
  progress: number,
  practiceCount: number,
}

export interface User extends Document {
  name: string;
  userId: string;
  lettersCount: number,
  notifications: boolean,
  learnedLetters: LearnedLetter[]
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
  learnedLetters: [{
    character: String,
    progress: Number,
    practiceCount: Number,
  }]
});

const UserModel = mongoose.model<User>('User', schema);

export default UserModel;