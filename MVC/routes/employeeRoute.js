const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.get('/employeelist', employeeController.list);
router.get('/employee/:id', employeeController.add);
router.get('/employee2/:id', employeeController.add2);
router.post('/employee/save', employeeController.save);
router.post('/employee2/save', employeeController.save2);
router.get('/employeelistrecord/:id', employeeController.record);
router.get('/employee/edit/:id', employeeController.edit);
router.post('/employee/update/:id', employeeController.update);
router.get('/employeeadmin/del/:id', employeeController.delAdmin);
router.get('/employeeadmin/delete/:id', employeeController.deleteAdmin);

module.exports = router;