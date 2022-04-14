import express from "express";
import UserController from "../controllers/UserController";
import LocationsController from "../controllers/LocationsController";

const router = express.Router();

router.get("/users", UserController.getUsers);

router.get("/locations/:zoom", LocationsController.getLocationsByZoom);

export default router;
