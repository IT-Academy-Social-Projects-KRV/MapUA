import { Response, Request } from 'express';
import User, { IUser } from '../models/UserModel';

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
  },
  async toggleSubscriptions(req: Request, res: Response) {
    try {
      // userId - id of a user whose subscriptions we are interested in
      // and subscriptionIdm which we want to toggle
      const { userId, subscriptionId } = req.body;

      if (!userId || !subscriptionId) {
        return res
          .status(400)
          .json({ error: req.t('subsriptions.fields_error') });
      }

      let userData = await User.findOne({
        _id: userId
      });

      if (!userData) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }

      if (userData.subscriptions.includes(subscriptionId)) {
        userData.subscriptions = userData.subscriptions.filter(
          s => s !== subscriptionId
        );
      } else {
        userData.subscriptions.push(subscriptionId);
      }

      await userData.save();

      return res.status(200).json({ subscriptions: userData.subscriptions });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default SubscriptionsController;
