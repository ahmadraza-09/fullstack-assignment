const express = require('express');
const CardController = require('../controller/CardController');
const router = express.Router();

router.get('/cardslist', CardController.cardslist);
router.get('/singlecardslist/(:id)', CardController.singlecardslist);
router.post('/createCard', CardController.createCard);

module.exports = router;