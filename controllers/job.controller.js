const Job = require('../models/job');
const Typejob = require('../models/typejob');

exports.createJob = async (req, res) => {
  const { title, description, status, typejob, due_date } = req.body;
  const file = req.file;
  const userId = Number(req.user._id); // ép kiểu về số

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
    const userId = Number(req.user._id); // dùng _id thống nhất

    const query = { userId };

    if (typejob) {
      const typejobNumber = parseInt(typejob, 10);
      if (isNaN(typejobNumber)) {
        return res.status(400).json({ message: 'typejob không hợp lệ' });
      }
      query.typejob = typejobNumber;
    }

    const jobs = await Job.find(query); // KHÔNG dùng populate

    // Nếu cần thông tin Typejob đi kèm, join thủ công:
    const typejobIds = [...new Set(jobs.map(job => job.typejob))];
    const typejobs = await Typejob.find({ _id: { $in: typejobIds } });

    const typejobMap = {};
    typejobs.forEach(t => {
      typejobMap[t._id] = t;
    });

    const jobsWithTypejob = jobs.map(job => ({
      ...job.toObject(),
      typejobInfo: typejobMap[job.typejob] || null
    }));

    res.status(200).json(jobsWithTypejob);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

exports.getJobByTypejobName = async (req, res) => {
  try {
    const userId = Number(req.user._id); // dùng _id thống nhất

    const typejob = await Typejob.findOne({
      name: req.params.typejobName,
      userId
    });

    if (!typejob) {
      return res.status(404).json({ message: 'Không tìm thấy loại công việc' });
    }

    const jobs = await Job.find({
      typejob: typejob._id,
      userId
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy công việc theo loại', error });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(req.user._id); // dùng _id thống nhất

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
      { _id: id, userId },
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
    const userId = Number(req.user._id); // dùng _id thống nhất

    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      userId
    });

    if (!deletedJob) {
      return res.status(403).json({ message: 'Không có quyền xóa công việc này' });
    }

    res.status(200).json({ message: 'Xóa công việc thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa công việc', error });
  }
};
