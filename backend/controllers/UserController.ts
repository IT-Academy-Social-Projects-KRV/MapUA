import { Response, Request } from 'express';
import User from '../models/UserModel';
import Location from '../models/Locations';

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
        return res.status(400).json({ error: "User doesn't exist" });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
  async changeUserData(req: Request, res: Response) {
    try {
      let { id, ...newUserData } = req.body;
      const imageUrl:any = req.file
      if(imageUrl){
        newUserData= {
          ... newUserData,
          imageUrl:imageUrl.location
        }
      }
      const changeData = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            ...newUserData
          }
        },
        {
          new: true
        }
    );
    if (!changeData) {
      return res.status(400).json({ error: "User doesn't exist123" });
    }
    return res.status(200).json(changeData)
    
    } catch(err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;
