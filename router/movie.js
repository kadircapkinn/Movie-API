const express = require('express')
const {getMoives,addMovie,getMovie,editMovie,deleteMovie,top10,betweenDate} = require('../controller/moviesController');
const router = express.Router();


router.route('/movies').get(getMoives).post(addMovie);
router.route('/movies/top10').get(top10);
router.route('/movies/:movie_id').get(getMovie).put(editMovie).delete(deleteMovie);
router.route('/movies/between/:start_year/:end_year').get(betweenDate)

module.exports = router

