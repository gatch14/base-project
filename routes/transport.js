const express = require('express');
const router = express.Router();
const Controller = require('../src/controller.js');

router.get('/', Controller.show);

router.get('/:transport', Controller.showTransport);

router.post('/transport/save', Controller.save);

router.put('/transport/update', Controller.update);

router.delete('/transport/destroy', Controller.destroy);

router.post('/transport/findOne', Controller.findOne);

router.get('/transport/findAll', Controller.findAll);

module.exports = router;
