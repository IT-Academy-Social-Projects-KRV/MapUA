import { Response, Request } from "express";
import Location from "../models/Locations";

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      const center: [number, number] = [JSON.parse(req.body.center).lat, JSON.parse(req.body.center).lng],
          bounds = JSON.parse(req.body.bounds);

      const height = +(bounds._northEast.lat - bounds._southWest.lat);
      const width = +(bounds._northEast.lng - bounds._southWest.lng);

      let locations = (await Location.find({
        "coordinates.0": {
          $gt: center[0] - height,
          $lt: center[0] + height
        },
        "coordinates.1": {
          $gt: center[1] - width,
          $lt: center[1] + width
        }
      })).map(l => ({
        _id: l._id,
        coordinates: l.coordinates,
      }));

      locations = locations.slice(0, (locations.length < 50)? locations.length : 50);

      return res.json({ locations });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
  async getLocationById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const locations = await Location.findById(id);

      if (!locations) {
        return res.status(400).json({ message: "Location doesn't exist" });
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
        res.status(400).json({ message: "Data is present" });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default LocationsController;
