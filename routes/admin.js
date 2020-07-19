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

//endpoint bank
router.route('/bank')
    .get(adminController.viewBank)
    .post(upload, adminController.addBank)
    .put(upload, adminController.editBank);
router.route('/bank/:id')
    .delete(adminController.deleteBank);

//endpoint item
router.route('/item')
    .get(adminController.viewItem)
    .post(uploadMultiple, adminController.addItem);
router.route('/item/show-image/:id')
    .get(adminController.showImageItem);
router.route('/item/:id')
    .get(adminController.showEditItem)
    .put(uploadMultiple, adminController.editItem)
    .delete(adminController.deleteItem);
//endpoint item feature
router.route('/item/show-detail-item/:itemId')
    .get(adminController.viewDetailItem);
router.route('/item/add/feature')
    .post(upload, adminController.addFeature);
router.route('/item/update/feature')
    .put(upload, adminController.editFeature);
router.route('/item/:itemId/feature/:id')
    .delete(adminController.deleteFeature);

router.route('/booking')
    .get(adminController.viewBooking);

module.exports = router;