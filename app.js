var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv').config();
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })


var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name:'sellforme',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
    path: '/',
    maxAge: 1000 * 60 * 60,
    sameSite: true,
    secure: false
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500).json({ message: err.message});
    
});

module.exports = app;
