const express = require('express');

const controller = require('../controllers/user.controller.js');
const validation = require('../validation/user.validate.js');

const router = express.Router();

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', validation.postCreate, controller.postCreate);

router.get('/edit-user/:userId', controller.edit);

router.post('/edit-user/:userId', controller.postEdit);

router.get('/delete/:userId', controller.delete);

module.exports = router;