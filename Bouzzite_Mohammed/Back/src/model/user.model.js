// src/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ProjectUser=require("./projectUser.model");
const Project=require("./project.model");
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {                        // ✅ Added password field
        type: DataTypes.STRING,
        allowNull: false
    },

    metier: {
        type: DataTypes.ENUM(
            'Développeur Back-end',
            'Développeur Front-end',
            'Designer',
            'Rédacteur',
            'Développeur Full-stack',
            'DevOps Engineer',
            'Data Scientist',
            'Mobile Developer',
            'QA Engineer',
            'Project Manager',
            'Product Owner',
            'Scrum Master',
            'UI/UX Designer',
            'System Administrator',
            'Database Administrator',
            'Security Analyst',
            'Cloud Architect',
            'AI/ML Engineer',
            'Blockchain Developer',
            'Game Developer'
        ),
        allowNull: false,
        defaultValue: 'Développeur Full-stack'
    },

    currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'USD'
    },

    company_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },


}, {
    tableName: 'users',
    timestamps: true,
    underscored: true
});


module.exports = User;
