import express from "express";
import FilesController from "../controllers/FilesController";
import UserController from "../controllers/UserController";
import LocationsController from "../controllers/LocationsController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/locations/:id", LocationsController.getLocationById);
router.get("/locations/search/:zoom/:center/:bounds", LocationsController.getLocationsByZoom);
router.post("/locations/add", LocationsController.addLocation);
router.post("/uploadImage", FilesController.uploadImage);


export default router;

//Swager documentation API
/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *        type: object
 *        required:
 *          - name
 *          - account
 *        properties:
 *          id:
 *              type: string
 *              description: The auto-generated id of the user
 *          name:
 *              type: string
 *              description: Name of the user
 *          account:
 *               type: string
 *               description: Email of the user
 *        example:
 *            id: 1
 *            name: test
 *            account: test@gmai.com
 */
/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: The users managing API
 */

/**
 * @swagger
 * /users:
 *    get:
 *      summary: returns the list of all users
 *      tags: [Users]
 *      responses:
 *          200:
 *            description: The list of the users
 *            content:
 *             aplication/json:
 *                schema:
 *                  type: array
 *                  items:
 *                  $ref: "#/components/schemas/Users"
 */
