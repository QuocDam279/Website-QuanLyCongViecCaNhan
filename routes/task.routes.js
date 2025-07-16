const router = require('express').Router();
const taskController = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasksByProject); // Giữ lại nếu đang dùng
router.get('/project/name/:projectName', taskController.getTasksByProjectName); // 👈 thêm mới
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
