const mongoose = require('mongoose');
const Counter = require('./counter');

const TypejobSchema = new mongoose.Schema({
  _id: Number, // ID tự động tăng
  name: { type: String, maxlength: 50, required: true, unique: true }
});

// Tự tăng _id nếu chưa có
TypejobSchema.pre('save', async function (next) {
  if (this.isNew && (this._id === undefined || this._id === null)) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'typejob' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.seq;
  }
  next();
});

module.exports = mongoose.model('Typejob', TypejobSchema);
