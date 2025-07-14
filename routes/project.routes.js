const router = require('express').Router();
const projectController = require('../controllers/project.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);

module.exports = router;