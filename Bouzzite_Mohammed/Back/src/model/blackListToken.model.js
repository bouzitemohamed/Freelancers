// src/models/BlacklistedToken.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const BlacklistedToken = sequelize.define(
  "BlacklistedToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "blacklisted_tokens",
    timestamps: true,
    underscored: true, // uses created_at and updated_at
  }
);

module.exports = BlacklistedToken;
