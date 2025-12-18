const express = require("express");
const route = express.Router();
const { register, login,logout } = require("../controller/auth.controller");
const validateUser = require("../validator/userShcema");
const authMiddleware=require("../middleware/auth.middleware")
route.post("/register", validateUser, register);
route.post("/login", login);
route.post("/logout",authMiddleware,logout);
module.exports = route;