const express = require('express');
const router = express.Router();
const evaluateColleaguesController = require('../controllers/evaluateColleaguesController');

router.get('/evaluatecolleagueslist', evaluateColleaguesController.list);
router.get('/evaluatecolleaguesrecord/:id', evaluateColleaguesController.record);
router.get('/evaluatecolleaguesrecord/edit/:id', evaluateColleaguesController.edit);
router.post('/evaluatecolleagues/update/:id', evaluateColleaguesController.update);


module.exports = router;