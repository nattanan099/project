const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


router.get('/register', registerController.list);
router.get('/register/add', registerController.add);
router.post('/register/save', registerController.save);
router.get('/register/detail/:id', registerController.detail);
router.get('/register/del/:id', registerController.del);
router.get('/register/delete/:id', registerController.delete);
router.get('/register/edit/:id', registerController.edit);
router.post('/register/update/:id', registerController.update);




module.exports = router;