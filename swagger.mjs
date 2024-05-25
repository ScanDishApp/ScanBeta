import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ScanDish API doc',
    version: '1.0.0',
    description: 'Scandish is a bachelor project carried out by: Stine Marie Kvist, Danny Nguyen Le and Kabi Mohamed - at the University of Agder. The project involved creating an app where users can digitize cookbooks using ocr scanning. This is the API documentation for the app.',
  },
  servers: [
    {
      url: 'http://localhost:8080/', 
      description: 'Development server',
    },
    {
      url: 'https://scanbeta.onrender.com/', 
      description: 'Production server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./backend/routes/*.mjs'], 
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi, swaggerSpec };
