const express = require('express');
const router = express.Router();

const controller = require('./haedo-controller');

router.post('/in', controller.signin);
router.post('/out', controller.signout);


module.exports = router;