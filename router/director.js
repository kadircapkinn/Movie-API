const express = require('express');
const {getDirectors,addDirectors,getDirector,updateDirector,deleteDirector,directorsBestMovies} = require('../controller/directorController');
const router = express.Router();

router.route('/directors').get(getDirectors).post(addDirectors);
router.route('/directors/:director_id').get(getDirector).put(updateDirector).delete(deleteDirector)
router.route('/directors/:director_id/best10movie').get(directorsBestMovies)

module.exports = router