import express from "express";
import UserController from "../controllers/UserController";
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
<<<<<<< HEAD
router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.post("/forgot-password", AuthController.forgotPassword);

router.get("/locations/:id", LocationsController.getLocationById);
router.post("/locations/location-list", LocationsController.getLocationsByZoom);
router.post(
  "/locations/add",
  upload.array("image"),
  LocationsController.addLocation
);
=======

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
>>>>>>> fdcad00307baa7f172f2bd786737d53f7f2daaf0

export default router;
