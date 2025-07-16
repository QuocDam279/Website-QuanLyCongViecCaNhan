const router = require('express').Router();
const jobController = require('../controllers/job.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);

router.post('/', jobController.createJob);
router.get('/', jobController.getJobByTypejob); 
router.get('/typejob/name/:typejobName', jobController.getJobByTypejobName); // 👈 thêm mới
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
