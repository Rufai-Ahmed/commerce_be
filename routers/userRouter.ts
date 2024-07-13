import { Router } from "express";
import {
  createUser,
  updateUser,
  verifyUser,
  signInUser,
} from "../controllers/userController";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Failed to create user
 */
router.post("/user", createUser);

/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               number:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 */
router.put("/user", updateUser);

/**
 * @swagger
 * /api/verify-user/{userID}:
 *   post:
 *     summary: Verify a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User verified successfully
 *       '404':
 *         description: User not found
 */
router.post("/verify-user/:userID", verifyUser);

/**
 * @swagger
 * /api/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User signed in successfully
 *       '401':
 *         description: Unauthorized
 */
router.post("/sign-in", signInUser);

export default router;
