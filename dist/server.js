'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _chatModel = require('./api/models/chatModel');

var _chatModel2 = _interopRequireDefault(_chatModel);

var _userModel = require('./api/models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var app = require('express')();
// var http = require('http').Server(app);

var port = process.env.PORT || 4000;
var app = (0, _express2.default)();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://addmin:addmin@ds059185.mongolab.com:59185/salesmanapp', {
  useMongoClient: true
  /* other options */
});

// Parsers for POST data
app.use(_bodyParser2.default.json(), function (err, req, res, next) {
  if (err) {
    return res.status(500).json({ error: err });
  }
  next();
});
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  if (req.headers && req.headers.token) {
    _jsonwebtoken2.default.verify(req.headers.token, 'RESTFULAPIs', function (err, decode) {
      if (err) {
        req.user = undefined;
        res.status(404).send({ message: "Invalid Token!" });
      }
      req.user = decode;
      // console.log("decode in side server.js", decode)
      next();
    });
  } else {
    // console.log("req.user in side server.js", req.user)
    req.user = undefined;
    next();
  }
});
var routes = require('./api/routes/chatRoutes');
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});
var server = _http2.default.createServer(app);

server.listen(port);

console.log('Chat RESTful API server started on: ' + port);

module.exports = app;