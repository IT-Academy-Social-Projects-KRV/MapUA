import { Response, Request } from "express";
import User from "../models/UserModel";
import Location from "../models/Locations";

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
        subscriptions: true,
      });

      if (!userData) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      return res.status(200).json({ userData });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async postUserLocation(req: Request, res: Response) {
    try {
      const { locationName, description, coordinates, photoSrc } = req.body;
      const _id = req.user;
      const userData = await User.findById(_id);

      if (!userData) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      const userLocation = new Location({
        locationName: locationName,
        coordinates: coordinates,
        photoSrc: photoSrc,
        description: description,
        comments: [],
        rating: {
          likes: [],
          dislikes: [],
        },
        filters: {
          favorite: [],
          visited: [],
          author: _id,
          cost: "free",
        },
      });

      const result = await userLocation.save();
      return res.status(200).json({ result });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;

