import express from 'express';
import FilesController from '../controllers/FilesController';
import LocationsController from '../controllers/LocationsController';
import AuthController from '../controllers/AuthController';
import passport from '../libs/passport';

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.get(
  '/protected-route',
  passport.authenticate('jwt', { session: false })
);

router.get('/locations/:id', LocationsController.getLocationById);
router.get('/locations/', LocationsController.getLocationsByZoom);
router.post('/locations/add', LocationsController.addLocation);
router.post('/uploadImage', FilesController.uploadImage);

export default router;
