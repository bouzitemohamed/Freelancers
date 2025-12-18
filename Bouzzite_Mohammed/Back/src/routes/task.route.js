const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getMyTasks
} = require("../controller/task.controller");

router.use(authenticate);

router.post("/", createTask);
router.get("/my-tasks", getMyTasks);
router.get("/project/:project_id", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
