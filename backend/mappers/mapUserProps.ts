import { IUser } from "../models/UserModel";

const mapUserProps = (user: IUser) => user._id;

export default mapUserProps;
