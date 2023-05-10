const dotenv = require('dotenv').config();

// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.route('/api/test')
.get((req ,res) => {
  let x = ':-)';
  // const mysql = require('mysql')
  // const connection = mysql.createConnection({
  //   host: process.env['MYSQL_HOST'],
  //   user: process.env['MYSQL_USER'],
  //   password: process.env['MYSQL_PASSWORD'],
  //   database: ['MYSQL_DATABASE'],
  //   port:3306
  // });
  // console.log(process.env['MYSQL_HOST'],process.env['MYSQL_USER'],process.env['MYSQL_PASSWORD'],process.env['MYSQL_DATABASE']);
  // connection.connect();
  // connection.query('SELECT * FROM users', (err, rows, fields) => {
  //   if (err) throw err;

  //   let = rows[0];
  // });
  // connection.end();
  res.send({msg: 'Secret: ' + x + ' from API'});
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
