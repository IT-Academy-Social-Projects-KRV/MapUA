import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  _id: string;
  passwordHash: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isValidPassword: (pass: string) => boolean;

  displayName: string;
  description: string;
  imageUrl: string;
  userToken: string;
  subscribers: string[];
  subscriptions: string[];
}

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },

    userToken: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    subscribers: {
      type: []
    },
    subscriptions: {
      type: []
    }
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  const user: IUser = this;
  const hash = await bcrypt.hash(user.passwordHash, 10);

  user.passwordHash = hash;
  next();
});

schema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.passwordHash);

  return compare;
};

export default mongoose.model<IUser>("User", schema);
