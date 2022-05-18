import express from "express";
import UserController from "../controllers/UserController";
import SubscriptionsController from "../controllers/SubscriptionsController";
import LocationsController from "../controllers/LocationsController";
import AuthController from "../controllers/AuthController";
import passport from "../libs/passport";
import multer from "multer";
import { upload } from "../utils/upload";


const router = express.Router();

router.post(
  "/get_profile_location",
  passport.authenticate("jwt", { session: false }),
  UserController.postUserLocation
);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  UserController.getProfile
);

router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  SubscriptionsController.getSubscriptions
);

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.post("/forgot-password", AuthController.forgotPassword);

router.post("/locations/location-list", LocationsController.getLocationsByZoom);
router.post(
  "/locations/add",
  upload.array("image"),
  LocationsController.addLocation
);

router.get('/locations/:id', LocationsController.getLocationById);
router.get('/locations/', LocationsController.getLocationsByZoom);

export default router;
