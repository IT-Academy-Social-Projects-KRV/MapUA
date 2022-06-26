import { Response, Request } from 'express';
import Location from '../models/Locations';
import User from '../models/UserModel';
import Comments from '../models/CommentModel';
import { rightsChecker } from '../utils/rightsChecker';
import mongoose from 'mongoose';
const LocationsController = {
  async getLocationsByZoom(req: Request, res: Response) {
    try {
      const bounds = JSON.parse(req.query.bounds as string);
      const searchName = req.query.name as string;
      const filters = JSON.parse(req.query.filters as any);
      const authFilters = JSON.parse(req.query.authFilters as any);

      // const personalFiltersNames = ['visited', 'favorites', 'personal'];
      const costFiltersNames = ['free', 'low cost', 'high cost'];
      const seasonalFiltersNames = [
        'winter',
        'summer',
        'spring',
        'autumn',
        'full year',
        'seasonal'
      ];

      let costFiltersArray = filters.filter((f: string) =>
        costFiltersNames.includes(f)
      );
      let seasonalFiltersArray = filters.filter((f: string) =>
        seasonalFiltersNames.includes(f)
      );

      let subscriptionsId = filters.filter((f: string) => f.match(/^\d/));

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
        filters: l.filters,
        author: l.author,
        verificationStatus: l.verificationStatus
      }));

      if (searchName) {
        locations = locations.filter(l => {
          return l.name.toLowerCase().startsWith(searchName.toLowerCase());
        });
      }

      if (costFiltersArray.length > 0) {
        locations = locations.filter(l => {
          return [
            ...l.filters.filter((f: string) => costFiltersNames.includes(f))
          ].some(el => filters.includes(el));
        });
      }

      if (seasonalFiltersArray.length > 0) {
        locations = locations.filter(l => {
          return [
            ...l.filters.filter((f: string) => seasonalFiltersNames.includes(f))
          ].some(el => filters.includes(el));
        });
      }

      if (authFilters.length > 0) {
        locations = locations.filter(l => {
          return [l._id.toHexString()].some(el => authFilters.includes(el));
        });
      }

      if (subscriptionsId.length > 0) {
        locations = locations.filter(l => {
          return [l.author.toHexString()].some(el =>
            subscriptionsId.includes(el)
          );
        });
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
        return res.status(300).json({
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
      ).populate({
        path: 'author',
        select: 'displayName imageUrl'
      });

      return res.status(200).json({
        changedData,
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

        const changeData = await User.findByIdAndUpdate(
          _id,
          {
            $push: { personalLocations: userLocation._id.toString() }
          },
          {
            new: true
          }
        );

        return res.status(200).json({
          personalLocations: changeData?.personalLocations,
          message: req.t('locations_list.location_add_success')
        });
      } else {
        res
          .status(400)
          .json({ error: req.t('locations_list.location_already_exist') });
      }
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  },
  async deleteLocation(req: Request, res: Response) {
    try {
      const locationId = req.params.id;
      const location = await Location.findById(locationId);
      if (!location) {
        return res
          .status(400)
          .json({ error: req.t('locations_list.location_not_found') });
      }

      const { _id: userId, role } = req.user;

      const isUserHasRights = rightsChecker(userId, role, location.author!);

      if (!isUserHasRights) {
        return res.status(403).json({ error: req.t('forbidden_role_action') });
      }

      await Location.deleteOne({ _id: locationId });
      const userData = await User.findById(userId);

      if (!userData) {
        return res.status(403).json({ error: req.t('auth.user_not_exist') });
      }

      const changeData = await User.updateOne(
        { personalLocations: locationId },
        { $pull: { personalLocations: locationId } }
      );

      await User.updateMany(
        { favorite: locationId },
        { $pull: { favorite: locationId } }
      );

      await User.updateMany(
        { visited: locationId },
        { $pull: { visited: locationId } }
      );

      await Comments.deleteMany({
        locationId: locationId
      });

      const changedUserData = await User.findById(userId);
      return res.status(200).json({
        locationId: locationId,
        personalLocations: changedUserData?.personalLocations,
        visited: changedUserData?.visited,
        favorite: changedUserData?.favorite,
        message: req.t('del_location.location_del_success')
      });
    } catch (err: any) {
      return res.status(500).json({ error: req.t('other.server_error'), err });
    }
  }
};

export default LocationsController;
