// src/models/Client.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model'); // Assuming your User model is exported from User.js

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // reference the User model
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Company', 'Individual'), // adjust types if needed
        allowNull: false
    },
    contact_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    contact_email: {
        type: DataTypes.STRING(150),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    contact_phone: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    billing_address: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    is_archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'clients',
    timestamps: true,
    underscored: true
});

// Association (optional, but recommended)


module.exports = Client;
