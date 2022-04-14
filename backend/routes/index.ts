import express from "express";
import UserController from "../controllers/UserController";
import LocationController from "../controllers/LocationController";

const router = express.Router();

router.get("/users", UserController.getUsers);

router.get("/locations", LocationController.getLocations);

export default router;
