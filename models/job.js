const mongoose = require('mongoose');
const Counter = require('./counter');

const jobSchema = new mongoose.Schema({
  _id: Number,
  title: { type: String, maxlength: 50, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo'
  },
  typejob: { type: Number, ref: 'Typejob', required: true },
  userId: { type: Number, required: true, ref: 'User' },
  due_date: { type: Date },
  file: { type: String },
  created_at: { type: Date, default: Date.now }
});

let tempCounter = null;

jobSchema.pre('save', async function (next) {
  if (this.isNew && (this._id === undefined || this._id === null)) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'job' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this._id = counter.seq;
      tempCounter = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

jobSchema.post('save', function (doc, next) {
  tempCounter = null;
  next();
});

jobSchema.post('error', async function (error, doc, next) {
  if (tempCounter !== null) {
    await Counter.findByIdAndUpdate({ _id: 'job' }, { $inc: { seq: -1 } });
    tempCounter = null;
  }
  next(error);
});

module.exports = mongoose.model('Job', jobSchema);



/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - typejob
 *         - userId
 *       properties:
 *         _id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           maxLength: 50
 *           example: "Viết báo cáo tuần"
 *         description:
 *           type: string
 *           example: "Chuẩn bị báo cáo tiến độ công việc tuần 30"
 *         status:
 *           type: string
 *           enum: [todo, in_progress, done]
 *           example: "todo"
 *         typejob:
 *           type: integer
 *           example: 2
 *         userId:
 *           type: integer
 *           example: 5
 *         due_date:
 *           type: string
 *           format: date
 *           example: "2025-07-31"
 *         file:
 *           type: string
 *           example: "uploads/bao-cao.pdf"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2025-07-20T08:30:00Z"
 */
