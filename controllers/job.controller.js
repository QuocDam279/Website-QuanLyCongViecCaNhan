const Job = require('../models/job');
const Typejob = require('../models/typejob');

exports.createJob = async (req, res) => {
  const { title, description, status, typejob, due_date } = req.body;
  const file = req.file;
  const userId = req.user._id;

  try {
    const typejobId = parseInt(typejob, 10);
    if (isNaN(typejobId)) {
      return res.status(400).json({ message: 'Trường typejob phải là số' });
    }

    const job = new Job({
      title,
      description,
      status,
      typejob: typejobId,
      due_date,
      file: file?.filename || null,
      userId
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo công việc', error });
  }
};

exports.getJobByTypejob = async (req, res) => {
  try {
    const { typejob } = req.query;
    const query = { userId: req.user.id };
    if (typejob) query.typejob = typejob;

    const jobs = await Job.find(query).populate('typejob');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

exports.getJobByTypejobName = async (req, res) => {
  try {
    const typejob = await Typejob.findOne({
      name: req.params.typejobName,
      userId: req.user.id
    });
    if (!typejob) return res.status(404).json({ message: 'Không tìm thấy loại công việc' });

    const jobs = await Job.find({ typejob: typejob._id, userId: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy công việc theo loại', error });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      typejob: parseInt(req.body.typejob, 10)
    };
    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(403).json({ message: 'Không có quyền sửa công việc này' });
    }

    res.status(200).json({
      message: 'Cập nhật công việc thành công',
      data: updatedJob
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật công việc', error });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedJob) {
      return res.status(403).json({ message: 'Không có quyền xóa công việc này' });
    }

    res.status(200).json({ message: 'Xóa công việc thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa công việc', error });
  }
};
