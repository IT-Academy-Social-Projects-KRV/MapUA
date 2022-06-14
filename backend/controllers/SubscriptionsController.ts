import { Response, Request } from 'express';
import User, { IUser } from '../models/UserModel';

const SubscriptionsController = {
  async toggleSubscriptions(req: Request, res: Response) {
    try {
      const { userId, subscriptionId } = req.body;

      if (!userId || !subscriptionId) {
        return res
          .status(400)
          .json({ error: req.t('subsriptions.fields_error') });
      }

      let subscriberUserData = await User.findOne({
        _id: userId
      });
      let subscriptionUserData = await User.findOne({
        _id: subscriptionId
      });

      if (!subscriberUserData || !subscriptionUserData) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }

      if (subscriberUserData.subscriptions.includes(subscriptionId)) {
        subscriberUserData.subscriptions =
          subscriberUserData.subscriptions.filter(s => s !== subscriptionId);
        subscriptionUserData.subscribers =
          subscriptionUserData.subscribers.filter(s => s !== userId);
      } else {
        subscriberUserData.subscriptions.push(subscriptionId);
        subscriptionUserData.subscribers.push(userId);
      }

      await subscriberUserData.save();
      await subscriptionUserData.save();

      return res
        .status(200)
        .json({
          subscriptions: subscriberUserData.subscriptions,
          subscribers: subscriptionUserData.subscribers
        });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default SubscriptionsController;
