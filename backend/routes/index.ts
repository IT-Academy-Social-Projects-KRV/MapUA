import express from "express";
import FilesController from "../controllers/FilesController";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.post("/uploadImage", FilesController.uploadImage);

export default router;
