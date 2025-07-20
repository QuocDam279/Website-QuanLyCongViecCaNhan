const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const typejobRoutes = require('./routes/typejob.routes');
const jobRoutes = require('./routes/job.routes');
const userRoutes = require('./routes/user.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const app = express();

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối cơ sở dữ liệu
connectDB();

// Middleware để đọc dữ liệu từ body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tài liệu Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Các routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/typejobs', typejobRoutes);
app.use('/api/jobs', jobRoutes);

// Serve file upload (nếu có)
app.use('/uploads', express.static('uploads'));

// Cổng chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
