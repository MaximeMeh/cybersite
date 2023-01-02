// 'use strict';
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var freezbeRoutes = require('./routes/freezbeRoutes');
// var { config } = require('process');


var app = express();



// const start = async () => {
//   try {
//       await dbConnect(process.env.DB_CONNECTION_URL)
//       app.listen(port, () => {
//           console.log('Listening to port: ', port);
//       })
//   } catch (error) {
//       console.log(error);
//   }
// }

start();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()),
app.use(bodyParser.json());


// app.listen(config.port, () => console.log('Server is listening on http://localhost:' + config.port));

// app.use('/api', freezbeRoutes.routes);

// app.listen(config.port, () => console.log('Server is listening on http://localhost:' + config.port));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
