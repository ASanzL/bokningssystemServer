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

app.route('/api/book')
.post((req, res) => {
  console.log(req.body);
  let startTime = new Date(req.body.startTime);
  startTime = startTime.toISOString().slice(0, 19).replace('T', ' ');
  let endTime = new Date(req.body.endTime);
  endTime = endTime.toISOString().slice(0, 19).replace('T', ' ');
  // startTime = `${startTime.getFullYear()}${startTime.getUTCMonth()}${startTime.getDate()}${startTime.getHours()}${startTime.getMinutes()}${startTime.getSeconds()}`;
  console.log(startTime);
  // insert into booking (personnummer, airplanesId, startTime, endTime) values (12341122-1234, 1, NOW(), NOW());
  connection.query(
    `insert into booking (personnummer, airplanesId, startTime, endTime) values (${req.body.personnummer}, ${req.body.airplanesId}, '${(startTime)}', '${(endTime)}')`,
    // `INSERT INTO booking (personnummer, airplanesId, startTime, endTime) VALUES ("${req.body.personnummer}" "${req.body.airplanesId}" "${req.body.startTime}" "${req.body.endTime}" )`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(200);
  });
});

module.exports = app;
