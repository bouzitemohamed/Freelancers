const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./project.model");
const User=require("./user.model");
const Task = sequelize.define(
    "Task",
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
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("pending", "in_progress", "completed", "on_hold"),
            allowNull: false,
            defaultValue: "pending",
        },
        priority: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
            defaultValue: "medium",
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        estimated_hours: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        assigned_to: {
           type: DataTypes.INTEGER,
           allowNull: false,
           references: {
              model: User,
              key: "id",
             },
           onUpdate: "CASCADE",
           onDelete: "CASCADE",
          },

    },
    {
        tableName: "tasks",
        timestamps: true, // created_at and updated_at
        underscored: true,
    }
);



module.exports = Task;
