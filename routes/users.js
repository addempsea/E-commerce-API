var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.send('You\'re welcome to the site');
});




module.exports = router;
  