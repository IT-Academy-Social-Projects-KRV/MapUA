import { IUser } from "../models/UserModel";

const mapUserProps = (user: IUser) => {
  return {
    email: user.email,
    _id: user._id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export default mapUserProps;
