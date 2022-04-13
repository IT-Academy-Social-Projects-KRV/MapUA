import { Response, Request } from "express";
import Location from "../models/Locations";

const LocationController = {
  async getLocationId(req: Request, res: Response) {
    try {
      const { _id } = req.body;
      // const locations = await Locations.findById({ _id });
      const locations = Location.find();
      return res.json(locations);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

  async addLocation(req: Request, res: Response) {
    try {
      const { name, description, coordinates } = req.body;
      // console.log(name, description, coordinates, "name, description, coordinates");
      console.log(req.body, "req.body");

      // let location = Location.find();

      // const locaton = await Location.find({ coordinates: coordinates });

      // // if (locaton.length === 0) {
      // const newLocation = new Location({
      //   locationName: name,
      //   // coordinates: coordinates,
      //   photoSrc: "",
      //   description: description,
      //   // comments: [],
      //   // rating: {
      //   //   likes: 0,
      //   //   dislikes: 0,
      //   // },
      // });
      // newLocation.save(newLocation as any);

      // res.status(200).json(newLocation);
      // } else {
      //   res.status(500).json({ message: "Data is present" });
      // }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default LocationController;
