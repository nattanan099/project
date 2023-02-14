const express = require('express');
const router = express.Router();
const hrControllers = require('../controllers/hrControllers');


router.get('/hrlist', hrControllers.list);
router.get('/hrrecord/:id', hrControllers.record);
router.get('/hr/:id', hrControllers.add);
router.post('/hr/save', hrControllers.save);
router.get('/hr/edit/:id', hrControllers.edit);
router.post('/hr/update/:id', hrControllers.update);
router.get('/hrlistadmin', hrControllers.listadmin);
router.get('/hrlistadmin/del/:id', hrControllers.delAdmin);
router.get('/hrlistadmin/delete/:id', hrControllers.deleteAdmin);

module.exports = router;