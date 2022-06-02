import { Response, Request } from 'express';
import User from '../models/UserModel';

const SubscriptionsController = {
  async getSubscriptions(req: Request, res: Response) {
    try {
      const _id = req.user;

      const userData = await User.findById(_id, {
        subscriptions: true
      });

      if (!userData) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default SubscriptionsController;
