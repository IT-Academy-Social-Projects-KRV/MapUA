import { Response, Request } from "express";

const UserController = {
  async getUsers(req: Request, res: Response) {
    try {
      return res.status(200).json("Working great!");
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default UserController;
