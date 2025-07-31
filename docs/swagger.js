const swaggerJsdoc = require('swagger-jsdoc');
// This file can be left as is, as it references the comments in the route files.
// For brevity, I am not re-pasting the swagger config.
// The code provided in previous responses for this file is correct and complete.
module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Course Management API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/api/**/*.js'], // This path is crucial
});