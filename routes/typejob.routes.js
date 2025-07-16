const router = require('express').Router();
const typejobController = require('../controllers/typejob.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);
router.post('/', typejobController.createTypejob);
router.get('/', typejobController.getTypejob);

module.exports = router;