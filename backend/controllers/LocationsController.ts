import { Response, Request } from 'express';
import Location from '../models/Locations';
import User from '../models/UserModel';

const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      const bounds = JSON.parse(req.query.bounds as string);
      const searchName = req.query.name as string;
      const filters = JSON.parse(req.query.filters as any);
      let locations = (
        await Location.find({
          'coordinates.0': {
            $gt: bounds._southWest.lat,
            $lt: bounds._northEast.lat
          },
          'coordinates.1': {
            $gt: bounds._southWest.lng,
            $lt: bounds._northEast.lng
          }
        })
      ).map(l => ({
        _id: l._id,
        coordinates: l.coordinates,
        name: l.locationName,
        locationName: l.locationName,
        arrayPhotos: l.arrayPhotos,
        filters: l.filters
      }));
      if (searchName) {
        locations = locations.filter(l => {
          return l.name.toLowerCase().startsWith(searchName.toLowerCase());
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
      if (!locations) {
        return res.status(404).json({ error: req.t('locations_not_found') });
      }
      return res.json({ locations });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async getLocationById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const locations = await Location.findById(id);

      if (!locations) {
        return res.status(400).json({ error: req.t('location_not_found') });
      }
      return res.json(locations);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async addLocationComments(req: Request, res: Response) {
    try {
      const { id, comment } = req.body;
      const commentProperties: string[] = [
        'author',
        'text',
        'likes',
        'dislikes',
        'createdAt',
        'updatedAt'
      ];
      let isFullComment: boolean = true;

      commentProperties.forEach(field => {
        if (!Object.keys(comment).includes(field)) {
          isFullComment = false;
          return res
            .status(400)
            .json({ error: req.t('comment_not_have_properties'), field });
        }
      });

      if (isFullComment) {
        const updateLocation = await Location.findByIdAndUpdate(
          id,
          {
            $push: {
              comments: comment
            }
          },
          {
            new: true
          }
        );
        if (!updateLocation) {
          return res.status(400).json({ error: req.t('location_not_found') });
        }
        return res.status(200).json({ message: req.t('comment_add_success') });
      }
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },
  async updateLocationById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const location = await Location.findByIdAndUpdate(
        id,
        {
          $set: { ...req.body }
        },
        { new: true }
      ).exec();

      return res.status(200).json(location);
    } catch (err: any) {
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
        );

        res
          .status(200)
          .json({ message: req.t('change_location_info_success') });
      } else {
        res.status(400).json({ error: req.t('location_not_found') });
      }
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  },

  async postPersonalLocation(req: Request, res: Response) {
    try {
      const { locationName, description, coordinates, filters } = req.body;

      const location = await Location.find({ coordinates: coordinates });

      const imageUrls: string[] = [];

      if (location.length === 0) {
        Array.prototype.forEach.call(req.files, file => {
          imageUrls.push(file.location);
        });

        const _id = req.user;
        const userData = await User.findById(_id);

        if (!userData) {
          return res.status(400).json({ error: req.t('user_not_exist') });
        }

        const userLocation = new Location({
          locationName: locationName,
          coordinates: [+coordinates[0], +coordinates[1]],
          arrayPhotos: imageUrls,
          description: description,
          comments: [],
          rating: {
            likes: [],
            dislikes: []
          },
          filters: filters.split(','),
          author: _id
        });

        const result = await userLocation.save();

        return res
          .status(200)
          .json({ message: req.t('location_add_success'), result });
      } else {
        res.status(400).json({ error: req.t('location_already_exist') });
      }
    } catch (err: any) {
      return res.status(500).json({ error: req.t('server_error'), err });
    }
  }
};

export default LocationsController;
