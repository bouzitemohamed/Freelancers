// src/models/request.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");
const Project = require("./project.model");

const Request = sequelize.define("Request", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" }
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Project, key: "id" }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending"
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "requests",
    timestamps: true,
    underscored: true
});

// Associations

module.exports = Request;
