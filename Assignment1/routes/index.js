//var express = require('express');
//var router = express.Router();

/* GET home page. */

app = require('../app');

app.get('/', function(req, res) {
  res.render('index1', { title: 'Express' });
});

app.get('/pics', function(req, res) {
  //console.log("we got"+req);
  res.render('pics', { title: 'Express' });
});

app.get('/form', function(req, res) {
  //console.log("we got"+req);
  res.render('form', { title: 'Express' });
});


//module.exports = router;


//app = require('../app');
