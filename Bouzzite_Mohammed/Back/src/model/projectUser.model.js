// src/models/projectUser.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");
const Project = require("./project.model");
const ProjectUser = sequelize.define(
  "ProjectUser",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "project_users",
    timestamps: true,
    underscored: true,
  }
);

module.exports = ProjectUser;
