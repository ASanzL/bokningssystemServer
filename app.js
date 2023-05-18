const dotenv = require('dotenv').config();
var express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const mysql = require('mysql');
const { DATETIME } = require('mysql/lib/protocol/constants/types');

var connection=mysql.createConnection({
  host: process.env['MYSQL_HOST'],
  user: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE'],
  port: process.env['MYSQL_PORT'],
});
connection.connect();

function isSameDay(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return (date1.getFullYear() == date2.getFullYear()) && (date1.getMonth() == date2.getMonth()) && (date1.getDate() == date2.getDate());  
}

function getDaysInRange(startDate, endDate) {
  dates = [];
  date = new Date(startDate);
  console.log(startDate, endDate);
  while(startDate < endDate) {
    if (isSameDay(date, endDate)) {
      console.log('dates', dates);
      return dates;
    }
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
}

// TODO: Only dates after today (WHERE=)
function getBookingDaysOnAirplane(airplaneId) {
  connection.query(`SELECT * FROM booking WHERE airplanesId=${airplaneId}`, (err, rows, fields) => {
    if (err) throw err;
    console.log('yo', rows[0].startTime);
    console.log('yo', rows[0].endTime);
    return getDaysInRange(new Date(rows[0].startTime), new Date(rows[0].endTime));
  });
}

app.route('/api/test')
.get((req, res) => {
  connection.query('SELECT * FROM users', (err, rows, fields) => {
    if (err) throw err;
    for (const r of rows) {
      console.log(r.name  );
    }
    res.send({msg: 'Secret: ' + rows[0].name + ' from API'});
  });
});

app.route('/api/airplanes')
.get((req, res) => {
  connection.query('SELECT * FROM airplanes', (err, rows, fields) => {
    if (err) throw err;
    res.send({airplanes: rows});
  });
});

app.route('/api/airplanes/:airplaneId')
.get((req, res) => {
  connection.query(`SELECT * FROM airplanes WHERE id=${req.params.airplaneId}`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.route('/api/booked/:airplaneId/:dateToCheck')
.get((req, res) => {
  connection.query(`SELECT * FROM booking WHERE airplanesId=${req.params.airplaneId}`, (err, rows, fields) => {
    if (err) throw err;
    for (r of rows) {
      date = new Date(r.startTime);
      date.setHours(date.getHours()+2);
      endDate = new Date(r.endTime);
      endDate.setHours(endDate.getHours()+2);
      dateToCheck = new Date(req.params.dateToCheck);
      while(date < endDate) {
        if (isSameDay(date, dateToCheck)) {
          res.send(true);
          return;
        }
        date.setDate(date.getDate() + 1);
      }
    }
    res.send(false);
  });
});



app.route('/api/booked/')
.get((req, res) => {
  connection.query(`SELECT * FROM booking`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.route('/api/book')
.post((req, res) => {
  console.log(req.body);
  let startTime = new Date(req.body.startTime);
  startTime = startTime.toISOString().slice(0, 19).replace('T', ' ');
  let endTime = new Date(req.body.endTime);
  // Make it end of the day
  endTime.setDate(endTime.getDate()+1);
  endTime.setSeconds(endTime.getSeconds()-1);
  endTime = endTime.toISOString().slice(0, 19).replace('T', ' ');
  // console.log(getDaysInRange(startTime, endTime));
  console.log('days', getBookingDaysOnAirplane(1));
  connection.query(
    `insert into booking (personnummer, airplanesId, startTime, endTime) values ("${req.body.personnummer}", ${req.body.airplanesId}, '${(startTime)}', '${(endTime)}')`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(200);
  });
});

module.exports = app;
