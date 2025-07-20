const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API quản lý người dùng cá nhân',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: { type: 'string', example: '64b123a123b123c123d123e1' },
            name: { type: 'string', example: 'Nguyen Van A' },
            email: { type: 'string', example: 'nva@gmail.com' },
            password: { type: 'string', example: '123456' },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-07-20T07:00:00Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-07-20T08:00:00Z'
            }
          }
        },
        Job: {
          type: 'object',
          required: ['title', 'description', 'typejob'],
          properties: {
            _id: { type: 'string', example: '64c123a123b123c123d123e2' },
            title: { type: 'string', example: 'Lập trình viên Backend' },
            description: { type: 'string', example: 'Phát triển API RESTful cho hệ thống quản lý' },
            typejob: { type: 'integer', example: 1 },
            status: { type: 'string', example: 'pending' },
            due_date: { type: 'string', format: 'date', example: '2025-07-25' },
            file: { type: 'string', example: 'cv.pdf' },
            userId: { type: 'integer', example: 101 },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-07-20T07:00:00Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-07-20T08:00:00Z'
            }
          }
        },
        Typejob: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Backend' },
            description: { type: 'string', example: 'Công việc liên quan đến hệ thống máy chủ' },
            userId: { type: 'integer', example: 101 },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-07-20T07:00:00Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-07-20T08:00:00Z'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
