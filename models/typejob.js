const mongoose = require('mongoose');
const Counter = require('./counter');

/**
 * @swagger
 * components:
 *   schemas:
 *     Typejob:
 *       type: object
 *       required:
 *         - name
 *         - userId
 *       properties:
 *         _id:
 *           type: integer
 *           description: ID tự tăng của loại công việc
 *           example: 1
 *         name:
 *           type: string
 *           description: Tên loại công việc
 *           example: Thiết kế UI
 *         description:
 *           type: string
 *           description: Mô tả loại công việc
 *           example: Công việc liên quan đến thiết kế giao diện người dùng
 *         userId:
 *           type: integer
 *           description: ID người dùng tạo loại công việc
 *           example: 1001
 */

const TypejobSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: Number, required: true }
});

TypejobSchema.pre('save', async function (next) {
  if (this.isNew && (this._id === undefined || this._id === null)) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'typejob' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('Typejob', TypejobSchema);
