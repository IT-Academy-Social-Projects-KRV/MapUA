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
      const filters = JSON.parse(req.query.filters as any);
      const height = +(bounds._northEast.lat - bounds._southWest.lat);
      const width = +(bounds._northEast.lng - bounds._southWest.lng);
      let locations = (
        await Location.find({
          'coordinates.0': {
            $gt: center.lat - height,
            $lt: center.lat + height
          },
          'coordinates.1': {
            $gt: center.lng - width,
            $lt: center.lng + width
          }
        })
      ).map(l => ({
        _id: l._id,
        coordinates: l.coordinates,
        name: l.locationName,
        filters: l.filters
      }));
      if (name) {
        locations = locations.filter(l => {
          return l.name.toLocaleLowerCase().startsWith(name);
        });
      }
      if (filters.length > 0) {
        locations = locations.filter(l =>
          [...l.filters].some(el => filters.includes(el))
        );
      } else {
        locations = locations.slice(
          0,
          locations.length < 50 ? locations.length : 50
        );
      }
      return res.json({ locations });
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
        Array.prototype.forEach.call(req.files, file => {
          imageUrls.push(file.location);
        });

        const newLocation = new Location({
          locationName: locationName,
          coordinates: coordinates,
          // here, we can save not only one url for the location image
          // but rather an array of images
          arrayPhotos: imageUrls,
          description: description
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
      const { id, comment } = req.body;
      const commentProperties = ['author', 'text', 'likes', 'dislikes', 'createdAt', 'updatedAt'];

      if (!(await Location.exists({
        _id: id,
        comments: { $exists: true }
      }))) {
        return res.status(400).json({ error: "Location or comments doesn't exist" });
      }

      if (!commentProperties.every(field => Object.keys(comment).some(cf => field === cf))) {
        return res.status(410).json({ error: 'Missing fields in comment object!' });
      }

      const location = await Location.findByIdAndUpdate(
          {
            _id: id
          },
          {
            $push: {
              comments: comment
            }
          }
      );

      return res.status(200).json({ comments: location?.comments });
    } catch ( err: any ) {
      return res.status(500).json({ error: err.message });
    }
  },
  async changeLocationInfo(req: Request, res: Response) {
    try {
      const { _id, fields } = req.body;

      const location = await Location.findById(_id);
      if (location) {
        await Location.updateOne(
            {
              _id: _id
            },
            {
              $set: fields.reduce(
                  (prev: any, curr: any) => ({
                    ...prev,
                    [curr.name]: curr.value
                  }),
                  {}
              )
            }
        )

        res.sendStatus(200);
      } else {
        res.status(400).json({ error: 'There is no such location!' });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
}

export default LocationsController;
