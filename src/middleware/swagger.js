const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.SERVER_NAME,
      version: '1.0.0',
      description: 'Backend API for Kost Management System App',
    },
    servers: [
      {
        url: process.env.SERVER_URL,
        description: 'Current server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
  apis: [
    path.resolve(__dirname, '../routes/**/*.js')
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;