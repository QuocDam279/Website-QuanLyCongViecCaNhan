const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
  Type: { type: mongoose.Schema.Types.ObjectId, ref: 'Typejob' },
  due_date: Date,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);