import express from "express";
import FilesController from "../controllers/FilesController";
import UserController from "../controllers/UserController";
import LocationController from "../controllers/LocationsController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/locations", LocationController.getLocationId);
router.post("/locations/add", LocationController.addLocation);
router.post("/uploadImage", FilesController.uploadImage);

export default router;