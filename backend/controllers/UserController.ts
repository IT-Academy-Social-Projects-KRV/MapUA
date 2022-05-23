import { Response, Request } from 'express';
import User from '../models/UserModel';

const UserController = {
  async getProfile(req: Request, res: Response) {
    try {
      const _id = req.user;

      const userData = await User.findById(_id, {
        email: true,
        createdAt: true,
        updatedAt: true,
        displayName: true,
        description: true,
        imageUrl: true,
        locations: true,
        subscribers: true,
        subscriptions: true
      });

      if (!userData) {
        return res.status(400).json({ error: req.t('user_not_exist') });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  }
};

export default UserController;
