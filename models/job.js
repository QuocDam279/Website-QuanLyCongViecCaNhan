const mongoose = require('mongoose');
const Counter = require('./counter');

const jobSchema = new mongoose.Schema({
  _id: Number, // ID tự động
  title: { type: String, maxlength: 50, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo'
  },
  typejob: { type: Number, ref: 'Typejob', required: true }, // ID tham chiếu Typejob
  due_date: { type: Date },
  file: { type: String }, // Đường dẫn hoặc tên file đính kèm
  created_at: { type: Date, default: Date.now }
});

// ID tự tăng trước khi lưu
let tempCounter = null;

jobSchema.pre('save', async function (next) {
  if (this.isNew && (this._id === undefined || this._id === null)) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'job' },
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

// Nếu lưu thành công thì xóa biến rollback
jobSchema.post('save', function (doc, next) {
  tempCounter = null;
  next();
});

// Nếu lỗi, rollback lại ID
jobSchema.post('error', async function (error, doc, next) {
  if (tempCounter !== null) {
    await Counter.findByIdAndUpdate({ _id: 'job' }, { $inc: { seq: -1 } });
    tempCounter = null;
  }
  next(error);
});

module.exports = mongoose.model('Job', jobSchema);
