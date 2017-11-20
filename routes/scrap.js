const express = require('express');
const router = express.Router();
const Controller = require('../src/scrapController.js');

router.get('/', Controller.scrap);

module.exports = router;
