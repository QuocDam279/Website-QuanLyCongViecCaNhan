const mongoose = require('mongoose');
const Counter = require('./counter');

const userSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, maxlength: 50 },
  email: { type: String, maxlength: 255, unique: true },
  password: { type: String, maxlength: 255 },
  created_at: { type: Date, default: Date.now }
});


userSchema.pre('save', async function (next) {
  if (this.isNew && (this._id === undefined || this._id === null)) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'user' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = counter.seq;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
