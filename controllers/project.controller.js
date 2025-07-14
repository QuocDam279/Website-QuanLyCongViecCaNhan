const Project = require('../models/project');

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = new Project({ name, description, owner: req.user.id });
  await project.save();
  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.json(projects);
};
