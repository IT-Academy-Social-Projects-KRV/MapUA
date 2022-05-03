import { Response, Request } from "express";
import User from "../models/UserModel";

const UserController = {
  async getUsers(req: Request, res: Response) {
    try {
      return res.status(200).json("Working great!");
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
  async getUserData(req: Request, res: Response) {
    try {
      const userToken = req.params.userToken;

      const userData = (await User.find({ userToken: userToken }))[0];

      if (!userData) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default UserController;
