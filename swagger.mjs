// swagger.mjs

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ScanDish API doc',
    version: '1.0.0',
    description: 'Scandish is a bachelor project carried out by: Stine Marie Kvist, Danny Nguyen Le and Kabi Mohamed - at the University of Agder. The project involved creating an app where users can digitize cookbooks using ocr scanning. This is the API documentation for the app.',
  },
  servers: [
    {
      url: 'http://localhost:8080/', // Replace with your server URL
      description: 'Development server',
    },
    {
      url: 'https://scanbeta.onrender.com/', // Replace with your server URL
      description: 'Production server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./backend/routes/*.mjs'], // Path to the API docs, adjust this according to your structure
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
