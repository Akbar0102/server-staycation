const router = require('express').Router();
const {upload, uploadMultiple} = require('../middlewares/multer');
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
    .get(adminController.viewItem)
    .post(uploadMultiple, adminController.addItem);
router.route('/item/show-image/:id')
    .get(adminController.showImageItem);
router.route('/item/:id')
    .get(adminController.showEditItem)
    .put(uploadMultiple, adminController.editItem)
    .delete(adminController.deleteItem);

router.route('/booking')
    .get(adminController.viewBooking);

module.exports = router;