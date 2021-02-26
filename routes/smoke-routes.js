const express = require('express');

const smokeControllers = require('../controllers/smoke-controllers');

const router = express.Router();

router.patch('/:filename', smokeControllers.patchSmokeData);

module.exports = router;


