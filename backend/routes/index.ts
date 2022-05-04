import express from "express";
import FilesController from "../controllers/FilesController";
import UserController from "../controllers/UserController";
import LocationsController from "../controllers/LocationsController";
import AuthController from "../controllers/AuthController";
import passport from "../libs/passport";

const router = express.Router();

router.get("/userData/:_id", UserController.getUserData);
router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get(
  "/protected-route",
  passport.authenticate("jwt", { session: false })
);

router.get("/locations/:id", LocationsController.getLocationById);
router.post("/locations/location-list", LocationsController.getLocationsByZoom);
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
 *      Locations:
 *        type: object
 *        required:
 *          - locationName
 *          - account
 *        properties:
 *          locationName:
 *              type: string
 *              description: This is name
 *          coordinates:
 *              type: [number, number]
 *              description: Two coordinates in array
 *          photoSrc:
 *               type: string
 *               description: Location photo
 *          description:
 *               type: string
 *               description: Location description
 *          comments:
 *               type: string
 *               description: Location comments
 *          rating:
 *               type: object
 *               properties:
 *                like:
 *                 type: number
 *                dislike:
 *                 type: number
 *               description: Location ratings
 */
/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: The users managing API
 */

/**
 * @swagger
 *  tags:
 *      name: Locations
 *      description: The locations managing API
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

/**
 * @swagger
 * /locations/:id:
 *    get:
 *      summary: returns location by id
 *      tags: [Locations]locations
 *      responses:
 *          200:
 *            description: The location by id
 *            content:
 *             aplication/json:
 *                schema:
 *                  type: object
 *                  items: [number]
 *                  $ref: "#/components/schemas/Locations"
 *          400:
 *            description: Bad request. Location doesn`t find by id
 *
 */
