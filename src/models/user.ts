import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  userId: string;
  prefereces: string[];
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  preferences: {
    type: [String],
    required: true,
  }
});

const User = mongoose.model<IUser>('User', schema);

export default User;