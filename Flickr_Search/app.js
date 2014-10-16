var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "fd276bf94a511c0da666387ae3509ea1",
      secret: "de40624e243cd262"
    };


var app = module.exports = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());


function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}



app.post('/', function(req, res) {

  var search="";
  var UpSince="";
  var UpUntil="";
  var userid=""; 

  if(req.body.UpSince!="") {
    UpSince = new Date(req.body.UpSince).getTime()/1000;
    console.log("Upsince date"+req.body.UpSince);
    console.log("Upsince date"+UpSince);
  }
  if(req.body.UpUntil!="") {
    UpUntil= new Date(req.body.UpUntil).getTime()/1000;
    console.log("UpUntil date"+UpUntil);
  }
  if(req.body.search!="") {
    search = req.body.search;
    search.split(' ').join('+');
  }
  console.log("Now check if we query or not");

  if(search=="" && UpSince== "" && UpUntil== "" && req.body.username== ""){
    return res.redirect('/?nofields');
  } 

  else {

    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
      if(req.body.username=="") {
        flickr.photos.search({
        text: search,
        min_upload_date: UpSince,
        max_upload_date: UpUntil,
        page: 1,
        per_page: 500
      }, function(err, result) {


          var urlpics="";
          var urlpic=[];
          var url_user=[];
          var total = result.photos.total;

          if(total==0) { 
            console.log("Here");
            return res.redirect('/?noresult');  
          }
          else {

            for ( i=0; i < result.photos.total && i<100; i++) {
            var id = result.photos.photo[i].id;
            var secret = result.photos.photo[i].secret;
            var owner = result.photos.photo[i].owner;
            urlpic[i] = "https://farm"+result.photos.photo[i].farm+".staticflickr.com/"+result.photos.photo[i].server+"/"+id+"_"+secret+".jpg";
            url_user[i] = "http://www.flickr.com/people/"+owner+"/";

            }
                  
                  res.render("pics", {url: urlpic, user: url_user});
          }

        });
    }

  else {

    var form_username = req.body.username.split(' ').join('+');
    console.log("Found Username");

    flickr.people.findByUsername({
      username: form_username
    }, function(err, result){
    
      if(err) {
        console.log("error"+err);
        return res.redirect('/?wrongusername');
      }  
      else {
        userid=result.user.nsid;
        flickr.photos.search({
        text: search, user_id: userid,
        min_upload_date: UpSince,
        max_upload_date: UpUntil,
        page: 1,
        per_page: 500
      }, function(err, result) {

          var urlpics="";
          console.log("Test");
          var urlpic=[];
          var url_user=[];
          var total = result.photos.total;
          console.log("Tota pics are"+total);

          if(total==0)
            return res.redirect('/?noresult');

          else {

            for ( i=0;i < result.photos.total && i<100; i++) {
            //console.log(result.photos.photo[i].farm);
            var id = result.photos.photo[i].id;
            var secret = result.photos.photo[i].secret;
            var owner = result.photos.photo[i].owner;
            console.log("owner is"+owner);
            urlpic[i] = "https://farm"+result.photos.photo[i].farm+".staticflickr.com/"+result.photos.photo[i].server+"/"+id+"_"+secret+".jpg";
            //console.log("Where"); 

            url_user[i] = "http://www.flickr.com/people/"+owner+"/";
            console.log("Here"+url_user[i]);

            }

              res.render("pics", {url: urlpic, user: url_user});
          }
        });    
        } 
      });
      }
    }); 
  }
});


  




app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});



require('./routes');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;





