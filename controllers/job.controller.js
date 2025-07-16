const Job = require('../models/job');

const Typejob = require('../models/typejob');

exports.createJob = async (req, res) => {
  const { title, description, status, typejob, due_date } = req.body;
  try {
    const job = new Job({ title, description, status, typejob, due_date });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo task', error });
  }
};

exports.getJobByTypejob = async (req, res) => {
  const { typejob } = req.query;
  try {
    const job = await Job.find({ typejob });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách công việc', error });
  }
};

exports.getJobByTypejobName = async (req, res) => {
  const typejobName = req.params.typejobName;
  try {
    const typejob = await Typejob.findOne({ name: typejobName });
    if (!typejob) {
      return res.status(404).json({ message: `Không tìm thấy dự án với tên loại công việc "${typejobName}"` });
    }
    const job = await Job.find({ typejob: typejob._id });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy công việc theo id loại công việc', error });
  }
};

// Cập nhật task
exports.updateJob = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy công việc để cập nhật' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật công việc', error });
  }
};

// Xoá task
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Công việc đã được xoá' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá công việc', error });
  }
};
