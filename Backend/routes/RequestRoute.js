const express = require('express');
const RequestController = require('../controller/RequestController');
const router = express.Router();

router.get('/requestlist', RequestController.requestlist); 
router.get('/singlerequestlist/(:id)', RequestController.singlerequestlist); 
router.post('/createRequest', RequestController.createRequest);

module.exports = router;
