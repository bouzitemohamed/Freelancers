const { Sequelize } = require("sequelize");
const envVarible = require("./envVariable");

const sequelize = new Sequelize(envVarible.DB_NAME, envVarible.DB_USER, envVarible.DB_PASSWORD, {
  host: envVarible.DB_HOST,
  dialect: "mysql",
  port: envVarible.DB_PORT,
});
async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected with Sequelize!");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
}
[]
module.exports = { sequelize, connectToDB };