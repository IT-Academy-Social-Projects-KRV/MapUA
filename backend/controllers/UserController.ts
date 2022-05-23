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
        subscribers: true,
        subscriptions: true,
        favorite: true,
        visited: true,
        personalLocations: true,
      });

      if (!userData) {
        return res.status(400).json({ error: req.t('user_not_exist') });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async tougleFavorite(req: Request, res: Response) {
    try {
      let { idOfUser,idOfLocation } = req.body;
      const userData = await User.findById(idOfUser,{favorite:1});
      const locationData = await Location.findById(idOfLocation);
      if(!locationData){
        return res.status(400).json({ error: "Location doesn't exist" });
      }
      if(userData){
        if(userData.favorite.includes(idOfLocation)){

          let index = userData.favorite.findIndex((el)=>{
            if(el === idOfLocation){
              return el
            }
          })
          userData.favorite.splice(index,1)

        }else{
          userData.favorite.push(idOfLocation)
        }
      }else{
        return res.status(400).json({ error: "User doesn't exist" })
      }
      const changeData = await User.findByIdAndUpdate(
        idOfUser,
        {
          $set: {
            favorite : userData.favorite
          }
        },
        {
          new: true
        }
      );
      return res.status(200).json(changeData)
    } catch(err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
  async tougleVisited(req: Request, res: Response) {
    try {
      let { idOfUser,idOfLocation } = req.body;
      const userData = await User.findById(idOfUser,{visited:1});
      const locationData = await Location.findById(idOfLocation);
      if(!locationData){
        return res.status(400).json({ error: "Location doesn't exist" });
      }
      if(userData){
        if(userData.visited.includes(idOfLocation)){

          let index = userData.visited.findIndex((el)=>{
            if(el === idOfLocation){
              return el
            }
          })
          userData.visited.splice(index,1)

        }else{
          userData.visited.push(idOfLocation)
        }
      }else{
        return res.status(400).json({ error: "User doesn't exist" })
      }
      const changeData = await User.findByIdAndUpdate(
        idOfUser,
        {
          $set: {
            visited : userData.visited
          }
        },
        {
          new: true
        }
      );
      return res.status(200).json(changeData)
    } catch(err: any) {
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
      return res.status(400).json({ error: "User doesn't exist" });
    }
    return res.status(200).json(changeData)
    
    } catch(err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;
