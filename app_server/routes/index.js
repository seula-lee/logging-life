var express = require('express');
var router = express.Router();

var homeController = function(req, res){
  res.render('index', { title: 'Express' });
}

/* GET home page*/
router.get('/', homeController);

module.exports = router;
