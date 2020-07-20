const router = require('express').Router();
const {upload, uploadMultiple} = require('../middlewares/multer');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');

router.route('/signin')
    .get(adminController.viewSignin)
    .post(adminController.actionSignin);
router.use(auth);
router.route('/logout')
    .get(adminController.actionLogout);

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
//endpoint item activity
router.route('/item/add/activity')
    .post(upload, adminController.addActiviy);
router.route('/item/update/activity')
    .put(upload, adminController.editActivity);
router.route('/item/:itemId/activity/:id')
    .delete(adminController.deleteActivity);

//endpoint booking
router.route('/booking')
    .get(adminController.viewBooking);
router.route('/booking/:id')
    .get(adminController.showDetailBooking);
router.route('/booking/:id/confirmation')
    .put(adminController.actionConfirmation);
router.route('/booking/:id/reject')
    .put(adminController.actionReject);

module.exports = router;