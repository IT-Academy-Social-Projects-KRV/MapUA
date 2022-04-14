import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/users", UserController.getUsers);

export default router;

/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *        type: object
 *        required:
 *
 *        properties:
 *
 *        example:
 *            id: 1
 *            title: AAA
 *
 */

/**
 * @swagger
 * /users:
 *    get:
 *      summary: returns the test response string
 *      responses:
 *          304:
 *            description: Success
 *            content:
 *             aplication/json:
 *                schema:
 *                  type: array
 *                  items:
 *                  $ref: "#/components/schemas/Users"
 *
 */
