const express = require('express');

const controller = require('../controllers/transaction.controller.js');

const router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/:transactionId/complete', controller.complete);

router.post('/:transactionId/complete', controller.postComplete);

module.exports = router;