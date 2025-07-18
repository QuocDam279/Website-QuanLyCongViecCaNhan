const Job = require('../models/job');
const Typejob = require('../models/typejob');

exports.createJob = async (req, res) => {
  console.log('== BODY ==>', req.body);    
  console.log('== FILE ==>', req.file);  

  const { title, description, status, typejob, due_date } = req.body;
  const file = req.file;

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
      file: file?.filename || null
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('❌ CREATE JOB ERROR:', error);
    res.status(500).json({ message: 'Lỗi khi tạo công việc', error });
  }
};


//hàm getJobByTypejob
exports.getJobByTypejob = async (req, res) => {
  try {
    const { typejob } = req.query;
    const query = typejob ? { typejob } : {};
    const jobs = await Job.find(query).populate('typejob');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};


//hàm getJobByTypejobName
exports.getJobByTypejobName = async (req, res) => {
  try {
    const typejob = await Typejob.findOne({ name: req.params.typejobName });
    if (!typejob) return res.status(404).json({ message: 'Không tìm thấy loại công việc' });

    const jobs = await Job.find({ typejob: typejob._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy công việc theo loại', error });
  }
};

//hàm updateJob
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      typejob: parseInt(req.body.typejob, 10),
    };

    // Nếu có file đính kèm mới
    if (req.file) {
      updateData.file = req.file.filename;
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }

    res.status(200).json({
      message: 'Cập nhật công việc thành công',
      data: updatedJob
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật công việc:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật công việc', error });
  }
};


//hàm deleteJob
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Không tìm thấy công việc' });
    }
    res.status(200).json({ message: 'Xóa công việc thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa công việc', error });
  }
};
