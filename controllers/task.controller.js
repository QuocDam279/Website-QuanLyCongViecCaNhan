const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { title, description, status, project, due_date } = req.body;
  const task = new Task({ title, description, status, project, due_date });
  await task.save();
  res.json(task);
};

exports.getTasksByProject = async (req, res) => {
  const { project } = req.query;
  const tasks = await Task.find({ project });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};