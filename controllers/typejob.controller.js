const Typejob = require('../models/typejob');
const mongoose = require('mongoose');

exports.createTypejob = async (req, res) => {
  const { name, description } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Không xác định được người dùng' });
  }

  try {
    const newTypejob = new Typejob({
      name,
      description,
      userId: req.user._id
    });

    const saved = await newTypejob.save();
    res.status(201).json({ message: 'Thêm typejob thành công', data: saved });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm typejob', error });
  }
};


exports.getTypejob = async (req, res) => {
  try {
    const list = await Typejob.find({ userId: req.user._id });
    res.json({ message: 'Danh sách typejob', data: list });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách', error });
  }
};

exports.updateTypejob = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    const updated = await Typejob.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name: req.body.name },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy typejob' });
    }
    res.json({ message: 'Cập nhật thành công', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật typejob', error });
  }
};

exports.deleteTypejob = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    const deleted = await Typejob.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy typejob để xóa' });
    }
    res.json({ message: 'Xóa thành công', data: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa typejob', error });
  }
};
