const router = require('express').Router();
const {upload} = require('../middlewares/multer');
const adminController = require('../controllers/adminController');

router.route('/dashboard')
    .get(adminController.viewDashboard);

router.route('/category')
    .get(adminController.viewCategory)
    .post(adminController.addCategory)
    .put(adminController.editCategory);
router.route('/category/:id')
    .delete(adminController.deleteCategory);

router.route('/bank')
    .get(adminController.viewBank)
    .post(upload, adminController.addBank)
    .put(upload, adminController.editBank);
router.route('/bank/:id')
    .delete(adminController.deleteBank);

router.route('/item')
    .get(adminController.viewItem);

router.route('/booking')
    .get(adminController.viewBooking);

module.exports = router;