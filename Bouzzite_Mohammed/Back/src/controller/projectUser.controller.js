const ProjectUser = require("../model/projectUser.model");
const User = require("../model/user.model");
const Project = require("../model/project.model");

const getProjectUsers = async (req, res) => {
    try {
        const project_id = req.params.id;

        // Find project with all users (creator + freelancers if stored in ProjectUser)
        const project = await Project.findByPk(project_id, {
            include: [
                {
                    model: User,
                    as: "Freelancers",  // must match the alias in belongsToMany
                    attributes: ["id", "firstName", "lastName", "email", "metier"],
                    through: { attributes: ["role"] } // get role from ProjectUser
                },
                {
                    model: User,
                    as: "User", // creator
                    attributes: ["id", "firstName", "lastName", "email", "metier"]
                }
            ]
        });

        if (!project) return res.status(404).json({ message: "Project not found" });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getProjectUsers };
