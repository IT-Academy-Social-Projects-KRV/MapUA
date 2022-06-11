import { IUser } from '../models/UserModel';

const mapUserProps = (user: IUser) => {
  return {
    role: user.role
  };
};

export default mapUserProps;
