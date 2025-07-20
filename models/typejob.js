const mongoose = require('mongoose');
const Counter = require('./counter');

const TypejobSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, 
  name: { type: String, required: true },
  description: { type: String },
 userId: { type: Number, required: true }
});


TypejobSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'typejob' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('Typejob', TypejobSchema);
