const Log = require('../models/log');

const logAction = async (userId, job, action, details) => {
  await Log.create({
    action,
    jobId: job._id,
    jobTitle: job.title,
    userId,
    details,
  });
};

module.exports = {
  logAction,
  statusMap,
};
