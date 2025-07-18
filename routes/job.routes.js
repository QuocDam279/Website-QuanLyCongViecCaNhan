const router = require('express').Router();
const jobController = require('../controllers/job.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
router.use(auth);

router.post('/', jobController.createJob);
router.get('/', jobController.getJobByTypejob); 
router.get('/typejob/name/:typejobName', jobController.getJobByTypejobName); // 👈 thêm mới
router.put('/job/:id', upload.single('file'), jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.post('/create', upload.single('file'), jobController.createJob);


module.exports = router;
