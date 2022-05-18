import express from 'express';
import UserController from '../controllers/UserController';
import SubscriptionsController from '../controllers/SubscriptionsController';
import LocationsController from '../controllers/LocationsController';
import AuthController from '../controllers/AuthController';
import passport from '../libs/passport';
import multer from 'multer';
import { upload } from '../utils/upload';

const router = express.Router();

router.post(
  '/add_profile_location',
  passport.authenticate('jwt', { session: false }),
  UserController.postUserLocation
);
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  UserController.getProfile
);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/forgot-password', AuthController.forgotPassword);

router.get(
  '/subscriptions',
  passport.authenticate('jwt', { session: false }),
  SubscriptionsController.getSubscriptions
);

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.post('/forgot-password', AuthController.forgotPassword);

router.get('/locations/:id', LocationsController.getLocationById);
router.get('/locations/', LocationsController.getLocationsByZoom);
router.post(
  '/locations/add',
  upload.array('image'),
  LocationsController.addLocation
);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/google',
    scope: ['email', 'profile'],
    failureMessage: true
  }),
  AuthController.googleLoginCallback
);

router.patch('/locations', LocationsController.changeLocationInfo);

router.get(
  '/signin-fb',
  passport.authenticate('facebook', { session: false, scope: ['email'] })
);

router.get(
  '/signin/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/signin-fb',
    scope: ['email'],
    session: false,
    failureMessage: true
  }),
  AuthController.signInFacebook
);

export default router;
