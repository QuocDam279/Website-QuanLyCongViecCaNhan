const Task = require('../models/task');
const Project = require('../models/project'); // 👈 cần để tìm dự án theo tên

// Tạo task mới
exports.createTask = async (req, res) => {
  const { title, description, status, project, due_date } = req.body;
  try {
    const task = new Task({ title, description, status, project, due_date });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo task', error });
  }
};

// Lấy danh sách task theo project ID (qua query)
exports.getTasksByProject = async (req, res) => {
  const { project } = req.query;
  try {
    const tasks = await Task.find({ project });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách task', error });
  }
};

// 👉 Thêm mới: Lấy danh sách task theo **tên dự án**
exports.getTasksByProjectName = async (req, res) => {
  const projectName = req.params.projectName;
  try {
    const project = await Project.findOne({ name: projectName });
    if (!project) {
      return res.status(404).json({ message: `Không tìm thấy dự án với tên "${projectName}"` });
    }
    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy task theo tên dự án', error });
  }
};

// Cập nhật task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy task để cập nhật' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật task', error });
  }
};

// Xoá task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task đã được xoá' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá task', error });
  }
};
