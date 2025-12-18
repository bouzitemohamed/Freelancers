const app = require("./app.js");
const envVarible = require("./config/envVariable.js");
const { connectToDB, sequelize } = require("./config/db");
async function start() {
    await connectToDB();
    await sequelize.sync(/*{ alter: true }*/);
    app.listen(envVarible.PORT, () => {
        console.log(`this server is listen on PORT:${envVarible.PORT}`);
    });
};
start();