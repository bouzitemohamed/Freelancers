const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    toggleShared,
    getSharedProjects
} = require("../controller/project.controller");
const validateProject=require("../validator/projectSchema");
// All routes require authentication
router.use(authenticate);

router.post("/",validateProject, createProject);
router.get("/shared", getSharedProjects);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject); 
router.patch("/:id", updateProject);    
router.delete("/:id", deleteProject);
router.patch("/:id/toggle-shared", toggleShared);

module.exports = router;
