const router = require('express').Router();
const jobController = require('../controllers/job.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API cho quản lý công việc
 */

router.use(auth);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Lấy công việc theo typejob (query)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: typejob
 *         schema:
 *           type: integer
 *         description: ID typejob cần lọc
 *     responses:
 *       200:
 *         description: Danh sách công việc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
router.get('/', jobController.getJobByTypejob);

/**
 * @swagger
 * /api/jobs/typejob/name/{typejobName}:
 *   get:
 *     summary: Lấy công việc theo tên loại công việc
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: typejobName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách công việc theo tên typejob
 */
router.get('/typejob/name/:typejobName', jobController.getJobByTypejobName);

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Tạo công việc mới
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               typejob:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', upload.single('file'), jobController.createJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Cập nhật công việc
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               typejob:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/:id', upload.single('file'), jobController.updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Xóa công việc
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete('/:id', jobController.deleteJob);

module.exports = router;
