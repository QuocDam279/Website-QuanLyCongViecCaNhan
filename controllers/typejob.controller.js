const Typejob = require('../models/typejob');

exports.createTypejob = async (req, res) => {
  const { name, description } = req.body;
  const newTypejob = new Typejob({ name, description, owner: req.user.id }); // tên khác 'Typejob'
  await newTypejob.save();
  res.json(newTypejob);
};

exports.getTypejob = async (req, res) => {
  const typejobs = await Typejob.find({ owner: req.user.id }); // tránh trùng tên
  res.json(typejobs);
};
