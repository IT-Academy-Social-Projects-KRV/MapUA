import { Response, Request } from "express";
import User from "../models/UserModel";

const UserController = {
  async getUserData(req: Request, res: Response) {
    try {
      const _id = req.params._id;

      const userData = (await User.find(
          {
            _id: _id
          },
          {
              email: true,
              createdAt: true,
              updatedAt: true,
              displayName: true,
              description: true,
              imageUrl: true,
              locations: true,
              subscribers: true,
              subscriptions: true,
            }))[0];

      if (!userData) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;
