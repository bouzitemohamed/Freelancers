const Project = require("../model/project.model");
const Client = require("../model/client.model");
const User=require("../model/user.model");
const ProjectUser=require("../model/projectUser.model");
const { Op } = require("sequelize");
const createProject = async (req, res) => {
    try {
        const user_id = req.user.id; // from auth middleware
        const {
            client_id,
            name,
            description,
            billing_type,
            hourly_rate,
            fixed_amount,
            status,
            start_date,
            end_date_estimated
        } = req.body;

        // Optional: check if client belongs to the user
        const client = await Client.findOne({ where: { id: client_id, user_id } });
        if (!client) return res.status(404).json({ message: "Client not found" });

        // Create the project with shared default false
        const project = await Project.create({
            user_id,
            client_id,
            name,
            description,
            billing_type,
            hourly_rate,
            fixed_amount,
            status,
            start_date,
            end_date_estimated,
            shared: false  // default value
        });

        // Add the creator to ProjectUser table automatically
        await ProjectUser.create({
            project_id: project.id,
            user_id: user_id,
            role: "creator"  // optional field
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all projects of the logged-in user
const getProjects = async (req, res) => {
    try {
        const user_id = req.user.id;

        const projects = await Project.findAll({
            where: { user_id ,status: { [Op.ne]: "is_archived" }  },
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['firstName', 'lastName'] // select only name fields
                },
                {
                    model: Client,
                    as: 'Client',
                    attributes: ['name'] // select only client name
                }
            ]
        });

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a single project
const getProjectById = async (req, res) => {
    try {
        const user_id = req.user.id;
        const project = await Project.findOne({ where: { id: req.params.id, user_id } });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a project
const updateProject = async (req, res) => {
    try {
        const user_id = req.user.id;
        const project = await Project.findOne({ where: { id: req.params.id, user_id } });
        if (!project) return res.status(404).json({ message: "Project not found" });

        await project.update(req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const user_id = req.user.id;

        const project = await Project.findOne({
            where: { id: req.params.id, user_id }
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Soft delete → update status
        await project.update({ status: "is_archived" });

        return res.status(200).json({
            message: "Project archived successfully",
            project
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const toggleShared = async (req, res) => {
    try {
        const user_id = req.user.id; 
        const project_id = req.params.id;

        const project = await Project.findOne({ where: { id: project_id, user_id } });
        if (!project) return res.status(404).json({ message: "Project not found or you are not the owner" });

        // Toggle the shared boolean
        project.shared = !project.shared;
        await project.save();

        res.status(200).json({ message: `Project shared set to ${project.shared}`, project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getSharedProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { shared: true },
            include: [
                {
                    model: User,
                    as: "Freelancers",
                    attributes: ["id", "firstName", "lastName", "metier", "currency"],
                    through: { attributes: ["role"] }
                },
                {
                    model: Client,
                    as: "Client",
                    attributes: ["id", "name", "contact_email", "contact_phone"] // choose fields you want
                }
            ]
        });

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    toggleShared,
    getSharedProjects,
};
