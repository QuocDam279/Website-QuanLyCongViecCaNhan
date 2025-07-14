const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  due_date: Date,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);