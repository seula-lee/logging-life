var express = require('express');
var multer  = require('multer');
var fs      = require('fs');
var apiVisopn = require('../api/api-vision');

var router = express.Router();

// setting file information
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
  }
});

var upload = multer({storage: storage});

// FILE UPLOAD
router.post('/', upload.any() , function(req, res, next){
  var labelList = [];
  var inputFile = req.files[0].destination+req.files[0].filename;

  //GOOGLE VISION API call
  apiVisopn.detectLabels(inputFile, function (err, labels) {
      if(err == null)
        res.render('uploads', { src:"./uploads/"+req.files[0].filename , labels: labels});
  });
});

module.exports = router;

/* example output:
          {
            originalname: 'grumpy.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './uploads/',
            filename: '436ec561793aa4dc475a88e84776b1b9',
            path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
            size: 277056 }
 */
