var express = require('express');
var router = express.Router();
var path = require('path');
var movieData = require(path.resolve('data/items.json'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stars Wars Novelty Site', movies: movieData });
});

module.exports = router;
