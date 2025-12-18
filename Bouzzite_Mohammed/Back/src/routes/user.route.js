const express = require("express");
const router = express.Router();
const { getMe } = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware"); 
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: get authenticated user info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: info of authentiicated user
 */

router.use(authMiddleware);
router.get("/me", getMe);

module.exports = router;
