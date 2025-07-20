const router = require('express').Router();
const typejobController = require('../controllers/typejob.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Typejobs
 *   description: API cho quản lý loại công việc
 */

router.use(auth);

/**
 * @swagger
 * /api/typejobs:
 *   post:
 *     summary: Tạo loại công việc mới
 *     tags: [Typejobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Typejob'
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/', typejobController.createTypejob);

/**
 * @swagger
 * /api/typejobs:
 *   get:
 *     summary: Lấy danh sách loại công việc
 *     tags: [Typejobs]
 *     responses:
 *       200:
 *         description: Danh sách loại công việc
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Typejob'
 */
router.get('/', typejobController.getTypejob);

/**
 * @swagger
 * /api/typejobs/{id}:
 *   put:
 *     summary: Cập nhật loại công việc theo ID
 *     tags: [Typejobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Typejob'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy loại công việc
 */
router.put('/:id', typejobController.updateTypejob);

/**
 * @swagger
 * /api/typejobs/{id}:
 *   delete:
 *     summary: Xóa loại công việc theo ID
 *     tags: [Typejobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy loại công việc
 */
router.delete('/:id', typejobController.deleteTypejob);

module.exports = router;
