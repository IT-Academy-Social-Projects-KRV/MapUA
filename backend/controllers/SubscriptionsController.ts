import { Response, Request } from 'express';
import User, { IUser } from '../models/UserModel';

const SubscriptionsController = {
  async toggleSubscriptions(req: Request, res: Response) {
    try {
      const { subscriptionId } = req.body;
      const { _id: userId } = req.user;

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

      const findSubscriber = (s: any) => s._id.toString() ===  subscriptionId;

      let updatedSubscriber;
      let updatedSubscription;

      if (subscriberUserData.subscriptions.find(findSubscriber)) {
        updatedSubscriber = await User.findByIdAndUpdate({
          _id: userId
        },
        {
          $pull: { subscriptions: subscriptionId }
        },
        {
          new: true
        }).populate({
          path: 'subscribers subscriptions',
          select: 'displayName imageUrl'
        });

        updatedSubscription = await User.findByIdAndUpdate({
          _id: subscriptionId
        },
        {
          $pull: { subscribers: userId }
        },
        {
          new: true
        }).populate({
          path: 'subscribers subscriptions',
          select: 'displayName imageUrl'
        });
      } else {
        updatedSubscriber = await User.findByIdAndUpdate({
            _id: userId
          },
          {
            $push: { subscriptions: subscriptionId }
          },
          {
            new: true
          }).populate({
          path: 'subscribers subscriptions',
          select: 'displayName imageUrl'
        });

        updatedSubscription = await User.findByIdAndUpdate({
            _id: subscriptionId
          },
          {
            $push: { subscribers: userId }
          },
          {
            new: true
          }).populate({
          path: 'subscribers subscriptions',
          select: 'displayName imageUrl'
        });
      }

      if (!updatedSubscriber || !updatedSubscription) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }
      return res
        .status(200)
        .json({
          subscriptions: updatedSubscriber.subscriptions,
          subscribers: updatedSubscription.subscribers
        });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default SubscriptionsController;
