const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fintech Dashboard API',
            version: '1.0.0',
            description: 'API documentation for the Fintech Dashboard application',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server',
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
        security: [
            { bearerAuth: [] }
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = { swaggerUi, swaggerSpec };