// src/models/Project.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");
const Client = require("./client.model");
const ProjectUser=require("./projectUser.model");
const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billing_type: {
      type: DataTypes.ENUM("hourly", "fixed"),
      allowNull: false,
      defaultValue: "fixed",
    },
    hourly_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fixed_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed", "on_hold","is_archived"),
      allowNull: false,
      defaultValue: "pending",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date_estimated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shared:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
    }
  },
  {
    tableName: "projects",
    timestamps: true, // createdAt and updatedAt
    underscored: true,
  }
);

// Associations (optional)

module.exports = Project;
