let express = require('express');
let router = express.Router();
let Controller = require('../src/controller.js');

router.get('/', Controller.show);

router.get('/:transport', Controller.showTransport);

module.exports = router;
