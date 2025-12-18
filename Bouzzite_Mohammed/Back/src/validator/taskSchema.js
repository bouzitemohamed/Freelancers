const Joi = require("joi");

const taskSchema = Joi.object({
    project_id: Joi.number().integer().required(),
    title: Joi.string().max(255).required(),
    description: Joi.string().allow(null, "").max(1000),
    status: Joi.string().valid("pending", "in_progress", "completed", "on_hold").default("pending"),
    priority: Joi.string().valid("low", "medium", "high").default("medium"),
    due_date: Joi.date().allow(null),
    estimated_hours: Joi.number().optional(),
    estimated_hours: Joi.number().positive().allow(null)
});

// Middleware for Express
function validateTask(req, res, next) {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = validateTask;
