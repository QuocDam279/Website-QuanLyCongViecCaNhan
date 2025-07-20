const mongoose = require('mongoose');
const Counter = require('./counter');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: integer
 *           description: ID tự tăng của người dùng
 *           example: 1
 *         name:
 *           type: string
 *           description: Tên người dùng
 *           example: Nguyễn Văn A
 *         email:
 *           type: string
 *           description: Email người dùng
 *           example: nguyenvana@example.com
 *         password:
 *           type: string
 *           description: Mật khẩu (hash)
 *           example: $2a$10$abcd...
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Thời gian tạo
 *           example: 2025-07-20T10:00:00.000Z
 */

const userSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    maxlength: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

let tempCounter = null; // Dùng để rollback nếu lưu lỗi

// Tự tăng ID trước khi lưu
userSchema.pre('save', async function (next) {
  if (this.isNew && (this._id === undefined || this._id === null)) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'user' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.seq;
      tempCounter = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Reset biến rollback sau khi lưu thành công
userSchema.post('save', function (doc, next) {
  tempCounter = null;
  next();
});

// Xử lý rollback nếu lưu bị lỗi
userSchema.post('error', async function (error, doc, next) {
  if (tempCounter !== null) {
    await Counter.findByIdAndUpdate(
      { _id: 'user' },
      { $inc: { seq: -1 } }
    );
    tempCounter = null;
  }
  next(error);
});

module.exports = mongoose.model('User', userSchema);
