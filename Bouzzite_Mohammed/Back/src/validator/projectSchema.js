const Joi = require("joi");

const projectSchema = Joi.object({
    client_id: Joi.number().integer().required(),
    name: Joi.string().max(255).required(),
    description: Joi.string().allow(null, "").optional(),
    billing_type: Joi.string().valid("hourly", "fixed").required(),
    hourly_rate: Joi.number().positive().when("billing_type", { is: "hourly", then: Joi.required(), otherwise: Joi.forbidden() }),
    fixed_amount: Joi.number().positive().when("billing_type", { is: "fixed", then: Joi.required(), otherwise: Joi.forbidden() }),
    status: Joi.string().valid("pending", "in_progress", "completed", "on_hold").default("Planned"),
    start_date: Joi.date().required(),
    end_date_estimated: Joi.date().greater(Joi.ref('start_date')).optional()
});

// Middleware for validation
function validateProject(req, res, next) {
    const { error } = projectSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = validateProject;
