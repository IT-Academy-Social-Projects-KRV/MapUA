import { Response, Request } from "express";
import User from "../models/UserModel";

const UserController = {
  async getUserData(req: Request, res: Response) {
    try {
      const userToken = req.params.userToken;

      const userData = (await User.find(
          {
            userToken: userToken
          },
          {
              email: true,
              createdAt: true,
              updatedAt: true,
              displayName: true,
              description: true,
              imageUrl: true,
              userToken: true,
              locations: true,
              subscribers: true,
              subscriptions: true,
            }))[0];

      if (!userData) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;
