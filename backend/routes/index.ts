import express from 'express';
import UserController from '../controllers/UserController';
import LocationsController from '../controllers/LocationsController';
import AuthController from '../controllers/AuthController';
import CommentsController from '../controllers/CommentsController';
import SubscriptionsController from '../controllers/SubscriptionsController';
import passport from '../libs/passport';
import multer from 'multer';
import RoleChecker from '../middlewares/RoleChecker';
import { upload } from '../utils/upload';
import {
  CommentSchema,
  SendCommentSchema,
  UpdateCommentRatingSchema,
  forgotPasswordSchema,
  postPersonalLocationSchema,
  updateLocationLikesSchema,
  userLoginSchema,
  userRegistrationSchema,
  userDataSchema
} from '../utils/validationSchemes';
import { validateRequest } from '../utils/validation';

const router = express.Router();

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  UserController.getProfile
);

router.post(
  '/signup',
  userRegistrationSchema,
  validateRequest,
  AuthController.signUp
);
router.post('/signin', userLoginSchema, validateRequest, AuthController.signIn);
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
  passport.authenticate('jwt', { session: false }),
  SubscriptionsController.toggleSubscriptions
);

router.get('/locations/', LocationsController.getLocationsByZoom);

router.get(
  '/locations/waiting',
  passport.authenticate('jwt', { session: false }),
  RoleChecker.restrictTo('moderator', 'admin'),
  LocationsController.getWaitingForVerifyLocations
);
router.get(
  '/locations/reported',
  passport.authenticate('jwt', { session: false }),
  RoleChecker.restrictTo('moderator', 'admin'),
  LocationsController.getReportedLocations
);

router.patch(
  '/update_location/:id',
  passport.authenticate('jwt', { session: false }),
  upload.array('image'),
  LocationsController.changeLocationData
);

router.patch(
  '/locations/:id',
  passport.authenticate('jwt', { session: false }),
  updateLocationLikesSchema,
  validateRequest,
  LocationsController.updateLocationLikesById
);

router.patch(
  '/locations/report/:id',
  passport.authenticate('jwt', { session: false }),
  LocationsController.updateLocationReportById
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
router.delete(
  '/locations/:id',
  passport.authenticate('jwt', { session: false }),
  LocationsController.deleteLocation
);

router.post(
  '/comments/create',
  SendCommentSchema,
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

router.delete(
  '/comments/:id',
  passport.authenticate('jwt', { session: false }),
  CommentsController.deleteLocationComment
);

router.patch(
  '/comments-rating/:id',
  UpdateCommentRatingSchema,
  validateRequest,
  CommentsController.updateLocationCommentRatingById
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

router.patch(
  '/profile/ban/:id',
  passport.authenticate('jwt', { session: false }),
  RoleChecker.restrictTo('moderator', 'admin'),
  UserController.updateUserByBan
);

router.get('/topLocations', LocationsController.getTopLocations);
router.get('/topUsers', UserController.getTopUsers);

router.patch(
  '/toggleModerator',
  passport.authenticate('jwt', { session: false }),
  RoleChecker.restrictTo('admin'),
  UserController.toggleModeratorRights
);

export default router;
