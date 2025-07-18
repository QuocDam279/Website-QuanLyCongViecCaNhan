const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const typejobRoutes = require('./routes/typejob.routes');
const jobRoutes = require('./routes/job.routes');

const app = express();
dotenv.config();
connectDB();

// ✅ Dòng này phải ĐƯA LÊN TRƯỚC TẤT CẢ ROUTES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/typejob', typejobRoutes);
app.use('/api/job', jobRoutes); // CHỈ CẦN require 1 lần là đủ

app.use('/uploads', express.static('uploads'));
app.use('/api', jobRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
