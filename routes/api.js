const router = require('express').Router();
//const {upload, uploadMultiple} = require('../middlewares/multer');
const apiController = require('../controllers/apiController');

router.route('/landing-page')
    .get(apiController.landingPage);

module.exports = router;