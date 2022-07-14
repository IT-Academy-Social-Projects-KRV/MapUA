import { Response, Request } from 'express';
import User from '../models/UserModel';
import Location from '../models/Locations';

const UserController = {
  async getProfile(req: Request, res: Response) {
    try {
      const { _id } = req.user;

      const userData = await User.findById(_id, {
        displayName: true,
        description: true,
        imageUrl: true,
        subscribers: true,
        subscriptions: true,
        favorite: true,
        visited: true,
        personalLocations: true
      }).populate({
        path: 'subscribers subscriptions',
        select: 'displayName imageUrl'
      });

      if (!userData) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async getPrivateData(req: Request, res: Response) {
    try {
      const { _id } = req.user;

      const privateUserData = await User.findById(_id, {
        email: true,
        createdAt: true,
        updatedAt: true
      });

      if (!privateUserData) {
        return res.status(400).json({ error: req.t('user_not_exist') });
      }

      return res.status(200).json({ privateUserData });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async toggleFavorite(req: Request, res: Response) {
    try {
      let { idOfLocation } = req.body;
      const { _id } = req.user;

      const userData = await User.findById(_id, { favorite: 1 });
      const locationData = await Location.findById(idOfLocation);
      if (!locationData) {
        return res
          .status(400)
          .json({ error: req.t('locations_list.location_not_found') });
      }
      if (userData) {
        if (userData.favorite.includes(idOfLocation)) {
          let index = userData.favorite.findIndex(el => {
            if (el === idOfLocation) {
              return el;
            }
          });
          userData.favorite.splice(index, 1);
        } else {
          userData.favorite.push(idOfLocation);
        }
      } else {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }
      const changeData = await User.findByIdAndUpdate(
        _id,
        {
          $set: {
            favorite: userData.favorite
          }
        },
        {
          new: true
        }
      ).populate({
        path: 'subscribers subscriptions',
        select: 'displayName imageUrl'
      });
      return res.status(200).json({
        updatedUser: changeData,
        message: req.t('locations_list.toggle_favourite')
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async toggleVisited(req: Request, res: Response) {
    try {
      let { idOfLocation } = req.body;
      const { _id } = req.user;
      const userData = await User.findById(_id, { visited: 1 });
      const locationData = await Location.findById(idOfLocation);
      if (!locationData) {
        return res
          .status(400)
          .json({ error: req.t('locations_list.location_not_found') });
      }
      if (userData) {
        if (userData.visited.includes(idOfLocation)) {
          let index = userData.visited.findIndex(el => {
            if (el === idOfLocation) {
              return el;
            }
          });
          userData.visited.splice(index, 1);
        } else {
          userData.visited.push(idOfLocation);
        }
      } else {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }
      const changeData = await User.findByIdAndUpdate(
        _id,
        {
          $set: {
            visited: userData.visited
          }
        },
        {
          new: true
        }
      ).populate({
        path: 'subscribers subscriptions',
        select: 'displayName imageUrl'
      });
      return res.status(200).json({
        updatedUser: changeData,
        message: req.t('locations_list.toggle_visited')
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async changeUserData(req: Request, res: Response) {
    try {
      let { id, ...newUserData } = req.body;

      const imageUrl: any = req.file;
      if (imageUrl) {
        newUserData = {
          ...newUserData,
          imageUrl: imageUrl.location
        };
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
      ).populate({
        path: 'subscribers subscriptions',
        select: 'displayName imageUrl'
      });
      if (!changeData) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }
      return res.status(200).json(changeData);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async getOtherUserProfile(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      const userData = await User.findById(_id, {
        displayName: true,
        description: true,
        imageUrl: true,
        subscribers: true,
        subscriptions: true,
        favorite: true,
        visited: true,
        personalLocations: true,
        role: true
      }).populate({
        path: 'subscribers subscriptions',
        select: 'displayName imageUrl'
      });

      if (!userData) {
        return res.status(400).json({ error: req.t('auth.user_not_exist') });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async toggleModeratorRights(req: Request, res: Response) {
    try {
      const { otherUserId } = req.body;
      const currentRole = await User.findById(otherUserId, {
        role: true
      });

      const newRole = currentRole?.role === 'moderator' ? 'user' : 'moderator';

      const changedRole = await User.findByIdAndUpdate(
        otherUserId,
        {
          $set: {
            role: newRole
          }
        },
        {
          new: true,
          select: "role"
        },
      );
      return res.status(200).json(changedRole);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async getTopUsers(req: Request, res: Response) {
    const quantityInArray = 10;

    try {
      let users = await User.aggregate([
        {
          $project: {
            count: { $size: { $ifNull: ['$personalLocations', []] } },
            displayName: 1,
            imageUrl: 1
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);
      users = users.slice(
        0,
        users.length < quantityInArray ? users.length : quantityInArray
      );
      return res.json(users);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },

  async updateUserByBan(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const user = await User.findByIdAndUpdate(
        id,
        {
          $set: { role: req.body.role }
        },
        { new: true }
      ).populate({
        path: 'subscribers subscriptions',
        select: 'displayName imageUrl'
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: req.t('locations_list.location_not_found') });
      }
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
};
export default UserController;
