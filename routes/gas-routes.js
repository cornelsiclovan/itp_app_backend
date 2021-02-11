const express = require('express');

const gasControllers = require('../controllers/gas-controllers');

const router = express.Router();

router.get('/:type/:id', gasControllers.getGasData);
router.patch('/:filename', gasControllers.patchGasData);

module.exports = router;