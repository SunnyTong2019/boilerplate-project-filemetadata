'use strict';

var express = require('express');
var cors = require('cors');



// require and use "multer"...
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });



var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});



//When I submit a form that includes a file upload, I will receive the file name and size in bytes within the JSON response
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  if (!req.file) 
  { res.json('Please choose a file to upload.'); }
  else
  { res.json({file_name:req.file.originalname,file_size_in_bytes:req.file.size}); }
  
});



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
