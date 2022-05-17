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

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.post("/forgot-password", AuthController.forgotPassword);

router.post(
  "/locations/add",
  upload.array("image"),
  LocationsController.addLocation
);
router.get('/locations/:id', LocationsController.getLocationById);
router.get('/locations/', LocationsController.getLocationsByZoom);
router.get('/google',passport.authenticate('google', { scope: ['email','profile'] }));
router.get('/google/callback',passport.authenticate('google',{session:false,failureRedirect:'/google',scope: ['email','profile'],failureMessage:true}),AuthController.googleLoginCallback);
router.get('/google/login/success', (req,res)=>{
  if (req.user) {
      res.json({
       message : "User Authenticated",
      user : req.user
     })
  }
  else res.status(400).json({
    message : "User Not Authenticated",
   user : null
 })
});


export default router;
