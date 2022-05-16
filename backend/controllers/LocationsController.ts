import { resolveSoa } from 'dns';
import { Response, Request } from 'express';
import { TupleTypeReference } from 'typescript';
import Location from '../models/Locations';

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      const center = JSON.parse(req.query.center as string);
      const bounds = JSON.parse(req.query.bounds as string);
      const name = req.query.name as string;
      const filters = JSON.parse(req.query.filters as any)
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
        locations = locations.filter((l) => [...l.filters].some(el => filters.includes(el)));
      }else{
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
      const { locationName, description, coordinates } = req.body;

      const location = await Location.find({ coordinates: coordinates });
      const imageUrls: string[] = [];

      if (location.length === 0) {
        Array.prototype.forEach.call(req.files, (file) => {
          imageUrls.push(file.location);
        });

        const newLocation = new Location({
          locationName: locationName,
          coordinates: coordinates,
          // here, we can save not only one url for the location image
          // but rather an array of images
          photoSrc: imageUrls[0],
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

  async addLocationComments(req: Request, res: Response) {
    try {
      const {id,comment}=req.body;
      const locations = await Location.findById(id);
      if (!locations||!locations.comments) {
        return res.status(400).json({ error: "Location or comments doesn't exist" });
      }
      else{locations.comments.push(comment)};
      const updateLocations=await Location.findByIdAndUpdate(id,{comments:locations.comments}, { 'new': true })
      if (!updateLocations) {
        return res.status(400).json({ error: "Location doesn't exist" });
      }
      res.status(200).json(updateLocations.comments);

    }
    catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

}

export default LocationsController;