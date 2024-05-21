const express = require('express');
const router = express.Router()
const {userReg,userAuth} = require('../controller/userController');

router.route('/register').post(userReg)
router.route('/authenticate').post(userAuth);

module.exports = router;