const express = require('express');
const router = express.Router();

const controller = require('./haedo-controller');

router.post('/', controller.login);


module.exports = router;