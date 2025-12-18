
const Joi = require("joi");

const clientSchema = Joi.object({
    name: Joi.string().max(255).required(),
    type: Joi.string().max(100).required().valid("Company","Individual"),
    contact_name: Joi.string().max(255).required(),
    contact_email: Joi.string().email().required(),
    contact_phone: Joi.string().max(20).required(),
    billing_address: Joi.string().max(500).required(),
});

function validateClient(req, res, next) {
    const { error } = clientSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = validateClient;
