import { Response, Request } from "express";
import Location from "../models/Locations";

const LocationController = {
  async getLocationId(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const locations = await Location.findById(id);

      return res.json(locations);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },

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

export default LocationController;