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
