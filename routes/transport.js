var express = require('express');
var router = express.Router();
var Controller = require('../src/controller.js');

router.get('/', Controller.show);

router.get('/:transport', Controller.showTransport);

module.exports = router;
