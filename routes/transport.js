const express = require('express');
const router = express.Router();
const Controller = require('../src/controller.js');

router.get('/', Controller.show);

router.get('/:transport', Controller.showTransport);

router.post('/transport/save', Controller.save);

router.put('/transport/update', Controller.update);

module.exports = router;
