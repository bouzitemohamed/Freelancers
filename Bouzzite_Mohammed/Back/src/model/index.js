const User = require("./user.model");
const Client = require("./client.model");
const Project = require("./project.model");
const ProjectUser = require("./projectUser.model");
const Request=require("./request.model");
const Task=require("./task.model");
// USER → CLIENT
User.hasMany(Client, { foreignKey: "user_id" });
Client.belongsTo(User, { foreignKey: "user_id" });

// PROJECT CREATOR
User.hasMany(Project, { foreignKey: "user_id" });
Project.belongsTo(User, { foreignKey: "user_id" });

// PROJECT → CLIENT
Client.hasMany(Project, { foreignKey: "client_id" });
Project.belongsTo(Client, { foreignKey: "client_id" });

// SHARED PROJECTS (many-to-many)
User.belongsToMany(Project, {
    through: ProjectUser,
    foreignKey: "user_id",
    as: "SharedProjects",
});

Project.belongsToMany(User, {
    through: ProjectUser,
    foreignKey: "project_id",
    as: "Freelancers",
});
//SHARED REQUEST
User.hasMany(Request, { foreignKey: "user_id" });
Request.belongsTo(User, { foreignKey: "user_id" });

Project.hasMany(Request, { foreignKey: "project_id" });
Request.belongsTo(Project, { foreignKey: "project_id" });
//SHARED TASK
Task.belongsTo(Project, { foreignKey: "project_id" });
Project.hasMany(Task, { foreignKey: "project_id" });

Task.belongsTo(User, { foreignKey: "assigned_to", as: "Assignee" });
User.hasMany(Task, { foreignKey: "assigned_to", as: "AssignedTasks" });


module.exports = {
    User,
    Client,
    Project,
    ProjectUser,
    Task,
    Request
};
