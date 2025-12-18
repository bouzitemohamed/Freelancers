const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const {
  getProjectUsers
} = require("../controller/projectUser.controller");

// All routes require authentication
router.use(authenticate);
router.get("/:id",getProjectUsers);


module.exports = router;
