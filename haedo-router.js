const express = require('express');
const router = express.Router();

const controller = require('./haedo-controller');

router.get('/', controller.login);


module.exports = router;