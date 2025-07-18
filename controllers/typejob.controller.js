const Typejob = require('../models/typejob');

// Thêm mới
exports.createTypejob = async (req, res) => {
  try {
    const newTypejob = new Typejob({ name: req.body.name });
    const saved = await newTypejob.save();
    res.status(201).json({ message: 'Thêm typejob thành công', data: saved });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm typejob', error });
  }
};

// Lấy danh sách
exports.getTypejob = async (req, res) => {
  try {
    const list = await Typejob.find();
    res.json({ message: 'Danh sách typejob', data: list });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách', error });
  }
};

// Sửa
exports.updateTypejob = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updated = await Typejob.findByIdAndUpdate(id, { name: req.body.name }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy typejob' });
    }
    res.json({ message: 'Cập nhật thành công', data: updated });
  } catch (error) {
    console.error('Lỗi khi cập nhật typejob:', error); // 👈 Thêm dòng này
    res.status(500).json({ message: 'Lỗi khi cập nhật typejob', error });
  }
};


// Xóa
exports.deleteTypejob = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    const deleted = await Typejob.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy typejob để xóa' });
    }
    res.json({ message: 'Xóa thành công', data: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa typejob', error });
  }
};
