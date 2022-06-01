import express from 'express';
import UserController from '../controllers/UserController';
import SubscriptionsController from '../controllers/SubscriptionsController';
import LocationsController from '../controllers/LocationsController';
import AuthController from '../controllers/AuthController';
import passport from '../libs/passport';
import multer from 'multer';
import { upload } from '../utils/upload';
import {
  CommentSchema,
  forgotPasswordSchema,
  postPersonalLocationSchema,
  updateLocationLikesSchema,
  userAuthSchema,
  userDataSchema
} from '../utils/validationSchemes';
import { validateRequest } from '../utils/validation';

const router = express.Router();

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  UserController.getProfile
);
router.post('/signup', userAuthSchema, validateRequest, AuthController.signUp);
router.post('/signin', userAuthSchema, validateRequest, AuthController.signIn);
router.post(
  '/forgot-password',
  forgotPasswordSchema,
  validateRequest,
  AuthController.forgotPassword
);
router.get(
  '/subscriptions',
  passport.authenticate('jwt', { session: false }),
  SubscriptionsController.getSubscriptions
);

router.get('/locations/', LocationsController.getLocationsByZoom);
router.patch('/locations', LocationsController.changeLocationInfo);
router.patch(
  '/locations/:id',
  updateLocationLikesSchema,
  validateRequest,
  LocationsController.updateLocationLikesById
);
router.get('/locations/:id', LocationsController.getLocationById);
router.put(
  '/locations/comment',
  CommentSchema,
  validateRequest,
  LocationsController.addLocationComments
);
router.post(
  '/locations/create',
  upload.array('image'),
  postPersonalLocationSchema,
  validateRequest,
  passport.authenticate('jwt', { session: false }),
  LocationsController.postPersonalLocation
);

router.get(
  '/signin-google',
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
router.patch(
  '/profile',
  upload.single('image'),
  userDataSchema,
  validateRequest,
  UserController.changeUserData
);

router.get('/is-authenticated', AuthController.checkJwt);

router.put(
  '/tougleFavorite/',
  passport.authenticate('jwt', { session: false }),
  UserController.tougleFavorite
);
router.put(
  '/tougleVisited/',
  passport.authenticate('jwt', { session: false }),
  UserController.tougleVisited
);

export default router;
