import { Response, Request } from "express";
import Location from "../models/Locations";

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      // todo add search by coordinates
      // todo find data, sort and send top 50 results to frontend
      console.log(req.params.zoom);

      // todo create formula to calculate max amount of
      //  found locations, and max 100% of map width + 50% radius of it
      //  a lot of shit to do here :(
      // const locations = await Location.find({});
      //
      // if (!locations) {
      //   return res.status(400).json({ message: "Location doesn`t exist" });
      // }
      // return res.json(locations);
      return res.json("Backend got data about zoom and coords!");
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
  async getLocationById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const locations = await Location.findById(id);

      if (!locations) {
        return res.status(400).json({ message: "Location doesn`t exist" });
      }
      return res.json(locations);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

  //TODO - This is test controller
  async addLocation(req: Request, res: Response) {
    try {
      const { locationName, description, coordinates, photoSrc } = req.body;

      const locaton = await Location.find({ coordinates: coordinates });

      if (locaton.length === 0) {
        const newLocation = new Location({
          locationName: locationName,
          coordinates: coordinates,
          photoSrc: photoSrc,
          description: description,
        });
        const result = await newLocation.save(newLocation as any);
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "Data is present" });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default LocationsController;
