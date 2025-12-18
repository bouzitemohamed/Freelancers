const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Free Lance Back API",
      version: "1.0.0",
      description: "API documentation for Free Lance backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // adjust if needed
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
