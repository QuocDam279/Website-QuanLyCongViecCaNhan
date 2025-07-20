const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ✅ THÊM middleware xác thực
const authMiddleware = require('../middlewares/auth.middleware');

// ==== Auth Routes ====
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
