// src/controller/auth.controller.js
const User = require("../model/user.model");
const BlacklistedToken = require("../model/blackListToken.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const envVarible = require("../config/envVariable");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, envVarible.JWT_SECRET, { expiresIn: envVarible.JWT_EXPIRES_IN });
};

// REGISTER
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, metier, company_name, currency } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      metier,
      company_name,
      currency,
    });

    const token = generateToken(user);

    // Convert to plain object and remove password
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user);

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    res.status(200).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGOUT
const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(400).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.decode(token); // decode without verifying
    if (!decoded) return res.status(400).json({ error: "Invalid token" });

    const expiresAt = new Date(decoded.exp * 1000); // JWT exp → Date

    await BlacklistedToken.create({ token, expires_at: expiresAt });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
};
