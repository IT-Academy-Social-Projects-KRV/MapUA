import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userInfo } from 'os';

export interface IUser extends Document {
  email: string;
  _id: string;
  googleId: string;
  passwordHash: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isValidPassword: (pass: string) => boolean;
  displayName: string;
  description: string;
  imageUrl: string;
  subscribers: string[];
  subscriptions: string[];
  favorite: string[];
  visited: string[];
  personalLocations: string[];
}

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    googleId: {
      type: String
    },
    passwordHash: {
      type: String,
      required: true
    },
    displayName: {
      type: String
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String
    },
    subscribers: {
      type: [],
      default: []
    },
    subscriptions: {
      type: [],
      default: []
    },
    favorite: {
      type: [],
      default: []
    },
    visited: {
      type: [],
      default: []
    },
    personalLocations: {
      type: [],
      default: []
    }
  },
  {
    timestamps: true
  }
);
schema.pre('save', async function (next) {
  const user: IUser = this;
  if (user.passwordHash) {
    const hash = await bcrypt.hash(user.passwordHash, 10);

    user.passwordHash = hash;
    next();
  } else {
    next();
  }
});

schema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.passwordHash);

  return compare;
};

export default mongoose.model<IUser>('User', schema);
