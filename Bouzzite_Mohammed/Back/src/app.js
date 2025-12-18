const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const authRouter=require("./routes/auth.route");
const UserRouter=require("./routes/user.route");
const clientRouter=require("./routes/client.route");
const ProjectRouter=require("./routes/project.route");
const RequestRouter=require("./routes/request.route");
const projectUserRouter=require("./routes/projectUsers.route");
const TaskRouter=require("./routes/task.route");
const swaggerSpec = require("../swagger");
require("./model");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth",authRouter);
app.use("/api/client",clientRouter);
app.use("/api/user",UserRouter);
app.use("/api/project",ProjectRouter);
app.use("/api/request",RequestRouter);
app.use("/api/projectuser",projectUserRouter);
app.use("/api/task",TaskRouter);
app.get("/health",(req,res)=>{
    res.send("OK");
});
module.exports = app;

