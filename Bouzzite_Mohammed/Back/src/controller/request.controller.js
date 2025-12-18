const Request = require("../model/request.model");
const Project=require("../model/project.model");
const User=require("../model/user.model");
const ProjectUser=require("../model/projectUser.model");
const getRequestsForOwner = async (req, res) => {
    try {
        const owner_id = req.user.id; // the logged-in owner

        // Find all requests where this user is the owner and status is pending
        const requests = await Request.findAll({
            where: { owner_id, status: "pending" },
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName", "email","metier"], // freelancer info
                },
                {
                    model: Project,
                    attributes: ["id", "name", "shared"] // project info
                }
            ],
            order: [["created_at", "DESC"]]
        });
        if (requests.length === 0) {
            return res.status(200).json({ message: "You have no pending requests." });
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createRequest = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { project_id, role } = req.body;

        const project = await Project.findByPk(project_id);
        if (!project || !project.shared)
            return res.status(404).json({ message: "Project not found or not shared" });

        // Create the request
        const request = await Request.create({
            user_id,
            project_id,
            role,
            owner_id: project.user_id
        });

        res.status(201).json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const approveRequest = async (req, res) => {
    try {
        const request_id = req.params.id;
        const owner_id = req.user.id;

        // Find the request
        const request = await Request.findByPk(request_id);
        if (!request) return res.status(404).json({ message: "Request not found" });

        // Only owner can approve
        if (request.owner_id !== owner_id) {
            return res.status(403).json({ message: "You are not authorized to approve this request" });
        }

        // Update request status to approved
        request.status = "approved";
        await request.save();

        // Add the user to ProjectUser table
        await ProjectUser.create({
            user_id: request.user_id,
            project_id: request.project_id,
            role: request.role  // role from the request
        });

        res.status(200).json({ message: "Request approved and user added to project", request });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports={
    createRequest,
    getRequestsForOwner,
    approveRequest
};