import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import http from 'http';
import Chat from './api/models/chatModel'
import User from './api/models/userModel'
// var app = require('express')();
// var http = require('http').Server(app);

const port = process.env.PORT || 4000
const app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://addmin:addmin@ds059185.mongolab.com:59185/salesmanapp', {
  useMongoClient: true,
  /* other options */
});


// Parsers for POST data
app.use(bodyParser.json(), function (err, req, res, next) {
  if (err) {
    return res.status(500).json({ error: err });
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.headers && req.headers.token) {
    jsonwebtoken.verify(req.headers.token, 'RESTFULAPIs', (err, decode) => {
      if (err) {
        req.user = undefined;
        res.status(404).send({ message: "Invalid Token!" })
      }
      req.user = decode;
      // console.log("decode in side server.js", decode)
      next();
    });
  } else {
    // console.log("req.user in side server.js", req.user)
    req.user = undefined;
    next()
  }
});
var routes = require('./api/routes/chatRoutes');
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});
const server = http.createServer(app);

server.listen(port);

console.log('Chat RESTful API server started on: ' + port);

module.exports = app;
