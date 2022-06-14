import { Response, Request } from 'express';
import User, { IUser } from '../models/UserModel';

const SubscriptionsController = {
  async toggleSubscriptions(req: Request, res: Response) {
    try {
      const { subscriptionId } = req.body;
      const { _id: userId } = req.user;

      console.log('userId: ', userId);

      if (!userId || !subscriptionId) {
        return res
          .status(400)
          .json({ error: req.t('subsriptions.fields_error') });
      }

      // let subscriberUserData = await User.findOne({
      //   _id: userId
      // });

      let subscriberUserData = await User.findOne({
        _id: userId
      });
      // .populate({
      //   path: 'subscriptions',
      //   select: 'displayName imageUrl'
      // });

      // console.log('subscriberUserData: ', subscriberUserData);
    
      let subscriptionUserData = await User.findOne({
        _id: subscriptionId
      });
    
      if (!subscriberUserData || !subscriptionUserData) {     
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }

      const findSubcsiber = (s:any) => s._id.toString() ===  subscriptionId;

      let updatedSubscriber;
      let updatedSubscriptor;

      if (subscriberUserData.subscriptions.find(findSubcsiber)) {
        // subscriberUserData.subscriptions =
        //   subscriberUserData.subscriptions
        //     .filter((s:any) => s._id.toString() !== subscriptionId);
        // subscriptionUserData.subscribers =
        //   subscriptionUserData.subscribers.filter(s => s !== userId);
        updatedSubscriber = await User.updateOne({
          _id: userId
        }, 
        { 
          $pull: { subscriptions: subscriptionId} 
        },
        {
          new: true
        }).populate({
          path: 'subscriptions',
          select: 'displayName imageUrl'
        });

        updatedSubscriptor = await User.updateOne({
          _id: subscriptionId
        }, 
        { 
          $push: { subscribers: subscriptionId} 
        },
        {
          new: true
        }).populate({
          path: 'subscriptions',
          select: 'displayName imageUrl'
        });
      } else {
        // console.log('subscriptionId: ', subscriptionId);
        // console.log("subscriber1: ", subscriberUserData.subscriptions);
        subscriberUserData.subscriptions.push(subscriptionId);
        // console.log("subscriber2: ", subscriberUserData.subscriptions);
        subscriptionUserData.subscribers.push(userId);
      }
      
      console.log("updatedSubscriber: ", updatedSubscriber);
      console.log("updatedSubscriptor: ", updatedSubscriptor);
      // console.log("subscription: ", subscriptionUserData.subscribers);

      // await subscriberUserData.save();
      // await subscriptionUserData.save();

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
