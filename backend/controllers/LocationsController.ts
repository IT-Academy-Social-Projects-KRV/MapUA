import { Response, Request } from "express";
import Location from "../models/Locations";
// import { locations as locConst, locationType } from '../../frontend/src/constants/develop';
// import {equal} from "assert";

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      const zoom = +req.params.zoom,
          center: [number, number] = [JSON.parse(req.params.center).lat, JSON.parse(req.params.center).lng],
          bounds = JSON.parse(req.params.bounds);

      const height = +(bounds._northEast.lat - bounds._southWest.lat);
      const width = +(bounds._northEast.lng - bounds._southWest.lng);
      // console.log(width, height, center);
      // await Location.remove({});
      // await Location.insertMany(locConst);
      // console.log(await Location.find());

      let locations = (await Location.find()).map(l => ({
        _id: l._id,
        coordinates: l.coordinates,
      }));

      // if (!locations || locations.length) {
      //   return res.status(400).json({ message: "Location doesn't exist" });
      // }

      locations = locations.filter(l =>
          l.coordinates[0] > center[0] - height &&
          l.coordinates[0] < center[0] + height &&
          l.coordinates[1] > center[1] - width &&
          l.coordinates[1] < center[1] + width)
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
        res.status(500).json({ message: "Data is present" });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default LocationsController;
