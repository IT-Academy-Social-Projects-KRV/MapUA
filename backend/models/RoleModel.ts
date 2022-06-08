import mongoose from 'mongoose';
import { Role } from '../types';

export interface IRole extends Document {
  role: Role;
}

const schema = new mongoose.Schema(
  {
    value: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      unique: true,
      default: 'user'
    }
  }
);

export default mongoose.model<IRole>('Role', schema);
