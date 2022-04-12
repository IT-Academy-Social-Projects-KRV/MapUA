import mongoose from "mongoose";

export interface IUser extends Document {
  account: string;
  name: string;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Пожалуйста, введите имя пользователя"],
      trim: true,
      maxlength: [20, "Максимальная длина имени 20 символов"],
      minlength: [4, "Минимальная длина имени 4 символа"],
    },
    account: {
      type: String,
      required: [true, "Пожалуйста, введите email или телефон"],
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", schema);
