// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
const envVarible = require("../config/envVariable");
const BlacklistedToken = require("../model/blackListToken.model");
const User = require("../model/user.model");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token format" });

    // Check if token is blacklisted
    const blacklisted = await BlacklistedToken.findOne({ where: { token } });
    if (blacklisted) return res.status(401).json({ error: "Token is blacklisted. Please login again." });

    // Verify token
    const decoded = jwt.verify(token, envVarible.JWT_SECRET);

    // Attach user to request
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again." });
    }
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authenticate;
