const Joi = require("joi");

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    metier: Joi.string().required().valid(
        "Développeur Back-end",
        "Développeur Front-end",
        "Designer",
        "Rédacteur",
        "Développeur Full-stack",
        "DevOps Engineer",
        "Data Scientist",
        "Mobile Developer",
        "QA Engineer",
        "Project Manager",
        "Product Owner",
        "Scrum Master",
        "UI/UX Designer",
        "System Administrator",
        "Database Administrator",
        "Security Analyst",
        "Cloud Architect",
        "AI/ML Engineer",
        "Blockchain Developer",
        "Game Developer"
    ),
    company_name: Joi.string().required(),
    currency: Joi.string().required(),
});

// Middleware function
function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = validateUser;
