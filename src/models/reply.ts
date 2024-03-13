import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IReply extends Document {
  title: string;
  messages: string[];
}

const schema =new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  messages: {
    type: [String],
    required: true,
  }
});

const Reply = mongoose.model<IReply>('Reply', schema);

export default Reply;