import { Response, Request } from 'express';
import Location from '../models/Locations';

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      const center = JSON.parse(req.query.center as string);
      const bounds = JSON.parse(req.query.bounds as string);
      const name = req.query.name as string;
      const filters = JSON.parse(req.query.filters as string)
      const height = +(bounds._northEast.lat - bounds._southWest.lat);
      const width = +(bounds._northEast.lng - bounds._southWest.lng);

      let locations = (
        await Location.find({
          'coordinates.0': {
            $gt: center.lat - height,
            $lt: center.lat + height,
          },
          'coordinates.1': {
            $gt: center.lng - width,
            $lt: center.lng + width,
          },
        })
      ).map((l) => ({
        _id: l._id,
        coordinates: l.coordinates,
        name:l.locationName,
        filters:l.filters
      }));
      if(name){
        locations = locations.filter((l)=>{
          return l.name.toLocaleLowerCase().startsWith(name)
        })
      }
      if(filters.length > 0){
       locations = locations.filter((l)=>{
        return l.filters.includes(filters)
       })}else{
        locations = locations.slice(
          0,
          locations.length < 50 ? locations.length : 50
        );
      }
      return res.json({ locations })
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
  async getLocationById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const locations = await Location.findById(id);

      if (!locations) {
        return res.status(400).json({ error: "Location doesn't exist" });
      }
      return res.json(locations);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  //TODO - This is test controller
  async addLocation(req: Request, res: Response) {
    try {
      const { locationName, description, coordinates, photoSrc } = req.body;

      const location = await Location.find({ coordinates: coordinates });

      if (location.length === 0) {
        const newLocation = new Location({
          locationName: locationName,
          coordinates: coordinates,
          photoSrc: photoSrc,
          description: description,
        });
        const result = await newLocation.save(newLocation as any);
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: 'Data is present' });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default LocationsController;