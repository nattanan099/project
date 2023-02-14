const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');


router.get('/admin', adminControllers.list);
router.get('/admin/add', adminControllers.add);
router.post('/admin/save', adminControllers.save);
router.get('/admin/detail/:id', adminControllers.detail);
router.get('/admin/edit/:id', adminControllers.edit);
router.post('/admin/update/:id', adminControllers.update);
router.get('/admin/del/:id', adminControllers.del);
router.get('/admin/delete/:id', adminControllers.delete);
module.exports = router;