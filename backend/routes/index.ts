import express from 'express';
import UserController from '../controllers/UserController';
import LocationsController from '../controllers/LocationsController';
import AuthController from '../controllers/AuthController';
import CommentsController from '../controllers/CommentsController';
import SubscriptionsController from '../controllers/SubscriptionsController';
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
  '/private-user-data',
  passport.authenticate('jwt', { session: false }),
  UserController.getPrivateData
);
router.patch(
  '/private-user-data',
  upload.single('image'),
  passport.authenticate('jwt', { session: false })
  // UserController.changePrivateUserData
);

router.patch(
  '/subscriptions',
  // passport.authenticate('jwt', { session: false }),
  SubscriptionsController.toggleSubscriptions
);

router.get('/locations/', LocationsController.getLocationsByZoom);

router.patch(
  '/update_location/:id',
  passport.authenticate('jwt', { session: false }),
  upload.array('image'),
  LocationsController.changeLocationData
);

router.patch(
  '/locations/:id',
  updateLocationLikesSchema,
  validateRequest,
  LocationsController.updateLocationLikesById
);
router.get('/locations/:id', LocationsController.getLocationById);
router.post(
  '/locations/create',
  upload.array('image'),
  postPersonalLocationSchema,
  validateRequest,
  passport.authenticate('jwt', { session: false }),
  LocationsController.postPersonalLocation
);

router.post(
  '/comments/create',
  CommentSchema,
  validateRequest,
  CommentsController.createLocationComment
);
router.get('/comments/:locationId', CommentsController.getLocationComments);

router.patch(
  '/comments/:id',
  CommentSchema,
  validateRequest,
  CommentsController.editLocationComment
);

router.delete('/comments/:id', CommentsController.deleteLocationComment);

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
  '/toggleFavorite/',
  passport.authenticate('jwt', { session: false }),
  UserController.toggleFavorite
);
router.put(
  '/toggleVisited/',
  passport.authenticate('jwt', { session: false }),
  UserController.toggleVisited
);
router.get('/profile/:id', UserController.getOtherUserProfile);

export default router;
