const express = require('express');

const router = express.Router();

const smokeControllers = require('../controllers/smoke-controllers');

router.get('/smoke/:km', smokeControllers.getSmokeData);
router.patch('/:filename', smokeControllers.patchSmokeData);

module.exports = router;


