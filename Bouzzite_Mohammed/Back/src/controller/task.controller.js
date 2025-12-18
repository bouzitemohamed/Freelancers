const Task = require("../model/task.model");
const Project = require("../model/project.model");
const ProjectUser = require("../model/projectUser.model");
const User = require("../model/user.model");

// Create a new task (only project owner)
const createTask = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { project_id, title, description, status, priority, due_date, estimated_hours, assigned_to } = req.body;

        const project = await Project.findByPk(project_id);
        if (!project || project.user_id !== user_id) {
            return res.status(403).json({ message: "You are not allowed to create tasks for this project" });
        }

        // Default assigned_to to project owner if not provided
        let assignUserId = assigned_to || user_id;

        // Ensure assigned user is part of the project
        if (assignUserId !== user_id) {
            const isParticipant = await ProjectUser.findOne({ where: { project_id, user_id: assignUserId } });
            if (!isParticipant) return res.status(400).json({ message: "Assigned user is not a participant of the project" });
        }

        const task = await Task.create({
            project_id,
            title,
            description,
            status,
            priority,
            due_date,
            estimated_hours,
            assigned_to: assignUserId,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tasks of a project
const getTasks = async (req, res) => {
    try {
        const user_id = req.user.id;
        const project_id = req.params.project_id;

        const project = await Project.findByPk(project_id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        let tasks;
        if (user_id === project.user_id) {
            // Owner sees all tasks
            tasks = await Task.findAll({ where: { project_id } });
        } else {
            // Assigned users see only tasks assigned to them
            const isParticipant = await ProjectUser.findOne({ where: { project_id, user_id } });
            if (!isParticipant) return res.status(403).json({ message: "You are not allowed to view tasks for this project" });

            tasks = await Task.findAll({ where: { project_id, assigned_to: user_id } });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single task
const getTaskById = async (req, res) => {
    try {
        const user_id = req.user.id;
        const task_id = req.params.id;

        const task = await Task.findByPk(task_id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const project = await Project.findByPk(task.project_id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (user_id !== project.user_id) {
            const isAssigned = await ProjectUser.findOne({ where: { project_id: project.id, user_id } });
            if (!isAssigned && task.assigned_to !== user_id) {
                return res.status(403).json({ message: "You are not allowed to view this task" });
            }
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const user_id = req.user.id;
        const task_id = req.params.id;

        const task = await Task.findByPk(task_id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const project = await Project.findByPk(task.project_id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        // Owner can update everything
        if (user_id === project.user_id) {
            await task.update(req.body);
        } else {
            // Assigned user can only update limited fields
            if (task.assigned_to !== user_id) {
                return res.status(403).json({ message: "You are not allowed to update this task" });
            }
            const allowedFields = ['status', 'description', 'estimated_hours'];
            const updates = {};
            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) updates[field] = req.body[field];
            });
            await task.update(updates);
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task (only owner)
const deleteTask = async (req, res) => {
    try {
        const user_id = req.user.id;
        const task_id = req.params.id;

        const task = await Task.findByPk(task_id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const project = await Project.findByPk(task.project_id);
        if (project.user_id !== user_id) return res.status(403).json({ message: "You are not allowed to delete this task" });

        await task.destroy();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMyTasks = async (req, res) => {
    try {
        const user_id = req.user.id;

        const tasks = await Task.findAll({
            where: { assigned_to: user_id },
            include: [
                {
                    model: Project,
                    attributes: ["id", "name"]
                }
            ]
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getMyTasks
};
