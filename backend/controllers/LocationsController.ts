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
        return res
          .status(404)
          .json({ error: req.t('locations_list.locations_not_found') });
      }
      return res.json({ locations });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async getLocationById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const locations = await Location.findById(id).populate({
        path: 'author',
        select: 'displayName imageUrl'
      });

      if (!locations) {
        return res
          .status(400)
          .json({ error: req.t('locations_list.location_not_found') });
      }
      return res.json(locations);
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async updateLocationLikesById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const location = await Location.findByIdAndUpdate(
        id,
        {
          $set: { ...req.body }
        },
        { new: true }
      ).populate({
        path: 'author',
        select: 'displayName imageUrl'
      });
      if (!location) {
        return res
          .status(400)
          .json({ error: req.t('locations_list.location_not_found') });
      }
      return res.status(200).json(location);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async changeLocationData(req: Request, res: Response) {
    try {
      let { id: locationId } = req.params;
      let { locationName, description } = req.body;
      const { _id: userId } = req.user;

      const locationAuthorId = await Location.findById(locationId).select(
        'author'
      );

      if (locationAuthorId?.author.toString() !== userId) {
        return res
          .status(300)
          .json({
            error: req.t('locations_list.update_location_id_not_exist')
          });
      }

      const imageUrls: string[] = [];

      Array.prototype.forEach.call(req.files, file => {
        imageUrls.push(file.location);
      });

      let newData = {};

      if (imageUrls.length === 0) {
        newData = {
          locationName: locationName,
          description: description
        };
      } else {
        newData = {
          locationName: locationName,
          description: description,
          arrayPhotos: imageUrls
        };
      }

      const changedData = await Location.findByIdAndUpdate(
        locationId,
        {
          $set: {
            ...newData
          }
        },
        {
          new: true
        }
      );

      return res.status(200).json({
        updatedData: changedData,
        message: req.t('locations_list.update_location_success')
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
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

        const { _id } = req.user;
        const userData = await User.findById(_id);
        if (!userData) {
          return res.status(400).json({ error: req.t('auth.user_not_exist') });
        }

        const userLocation = new Location({
          locationName: locationName,
          coordinates: [+coordinates[0], +coordinates[1]],
          arrayPhotos: imageUrls,
          description: description,
          rating: {
            likes: [],
            dislikes: []
          },
          filters: filters.split(','),
          author: _id
        });
        await userLocation.save();
        return res
          .status(200)
          .json({ message: req.t('locations_list.location_add_success') });
      } else {
        res
          .status(400)
          .json({ error: req.t('locations_list.location_already_exist') });
      }
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default LocationsController;
