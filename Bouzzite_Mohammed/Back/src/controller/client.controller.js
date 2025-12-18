// src/controllers/client.controller.js
const Client = require("../model/client.model");
const User = require("../model/user.model");

// Create a new client (POST)
const createClient = async (req, res) => {
    try {
        const { name, type, contact_name, contact_email, contact_phone, billing_address } = req.body;
        const user_id = req.user.id; // from auth middleware

        const client = await Client.create({
            user_id,
            name,
            type,
            contact_name,
            contact_email,
            contact_phone,
            billing_address
        });

        res.status(201).json({ client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all clients for the logged-in user (GET)
const getClients = async (req, res) => {
    try {
        const user_id = req.user.id;

        const clients = await Client.findAll({
            where: { user_id, is_archived: false }
        });

        res.status(200).json({ clients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single client by ID (GET)
const getClientById = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;

        const client = await Client.findOne({
            where: { id, user_id }
        });

        if (!client) return res.status(404).json({ message: "Client not found" });

        res.status(200).json({ client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a client (PATCH)
const updateClient = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;
        const { name, type, contact_name, contact_email, contact_phone, billing_address } = req.body;

        const client = await Client.findOne({ where: { id, user_id } });
        if (!client) return res.status(404).json({ message: "Client not found" });

        await client.update({ name, type, contact_name, contact_email, contact_phone, billing_address });

        res.status(200).json({ client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete (soft delete) a client (DELETE)
const deleteClient = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;

        const client = await Client.findOne({ where: { id, user_id } });
        if (!client) return res.status(404).json({ message: "Client not found" });

        // Soft delete
        await client.update({ is_archived: true });

        res.status(200).json({ message: "Client archived successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getClientsForDropdown = async (req, res) => {
  try {
    const user_id = req.user.id;

    const clients = await Client.findAll({
      where: { user_id, is_archived: false },
      attributes: ['id', 'name'], // only id and name
      order: [['name', 'ASC']]
    });

    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    getClientsForDropdown
};
