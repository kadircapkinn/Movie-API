const express = require('express');
const router = express.Router();

router.route('/directors').get().post();
router.route('/directors/:director_id').get().put().delete()
router.route('/directors/:director_id/best10movie').get()

module.exports = router