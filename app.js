var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var superagent = require('superagent');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var hbs = require('hbs');
var session = require('express-session');
var cookieParser = require('cookie-parser');//引用cookie
var fs = require('fs');

var routes = require('./routes/routes');
var users = require('./routes/users');
var api = require('./routes/api');
var agent = require('./routes/testagent');
var config = require('./config');
var userInfoModel = require('./models/userInfo');
var absenteeismModel = require('./models/absenteeism');
var ak = require('./controllers/accesskey');


var app = express();
var router = express.Router();

var accessKey = '';

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html',hbs.__express);//设置模版引擎

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(methodOverride());
//app.use(cookieParser()); //设置cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{ path: '/', httpOnly: true, secure: false, maxAge: 43200000 }//maxAge为session的有效时间 这里设置为10个小时
}));

mongoose.connect(config.mongodb);


//设置中间件，运行Html上Javascript脚本进行跨域访问
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  next();
});

restify.serve(router,userInfoModel);
restify.serve(router,absenteeismModel);


//路由
app.use('/', routes);
app.use('/dateOfCFI',agent);
api(app);
app.use('/users', users);
app.use(router);

// ak(accessKey);
// var key = fs.readFileSync('key','utf-8');
// console.log("key:"+key);

app.post('/login',function(req,res){
   
  // console.log("身份正确");
  // req.session.uEmail = user.uEmail;
  // //res.setHeader('Set-Cookie', "ever=cx");
  // console.log("session: "+req.session.uEmail);
  // res.redirect('/');
  userInfoModel.findOne({"uEmail":req.body.uEmail},function(err,user){
    console.log(req.body);
    if(user){
      if(err){return;}
      if(user.uPassword === req.body.uPassword){
        console.log("身份正确");
        req.session.uEmail = user.uEmail;
        //res.setHeader('Set-Cookie', "ever=cx");
        console.log("session: "+req.session.uEmail);
        res.redirect('/');
      }else{
        res.json({"err":"wrong password"});
      }
    }else{
        res.json({"err":"not find user"});
        console.log("not find user");return;
    }
  });
});

app.post('/register',function(req,res){
  userInfoModel.findOne({"uEmail":req.body.uEmail},function(err,user){
    if(user){
      if(err){return;}
        res.json({"err":"This email has aleady been registerd!"});
        res.end();
    }else{
      var newUser = new userInfoModel({
        uEmail:req.body.uEmail,
        uPassword:req.body.uPassword
      });
      newUser.save(function(err) {
        if (err) {
          res.json({"err":" register fail."});
          res.end();
          return;
        }else{
          res.json({"success":" register success."});
          res.end();
          }
      });
    }
  });
});


// app.get('/posturl',function(req,res){});

// app.post('/posturl',function(req,res){
//   console.log(req.body);
// });




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
