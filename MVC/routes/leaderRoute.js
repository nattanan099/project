const express = require('express');
const router = express.Router();
const leaderController = require('../controllers/leaderController');

router.get('/leaderlist/:department_id', leaderController.list);
router.get('/leaderlist2', leaderController.list2);
router.get('/leaderlistma', leaderController.list3);
router.get('/leaderlististall', leaderController.list4);
router.get('/leaderrecord/:id', leaderController.record);
router.get('/leader/:id', leaderController.add);
router.post('/leader/save', leaderController.save);
router.get('/leader/edit/:id', leaderController.edit);
router.post('/leader/update/:id', leaderController.update);
router.get('/leaderlistadmin', leaderController.listadmin);
router.get('/leaderadmin/del/:id', leaderController.delAdmin);
router.get('/leaderadmin/delete/:id', leaderController.deleteAdmin);





module.exports = router;