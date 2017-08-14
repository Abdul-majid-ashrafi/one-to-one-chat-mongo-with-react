var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Chat = require('./api/models/chatModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://addmin:addmin@ds059185.mongolab.com:59185/salesmanapp', {
  useMongoClient: true,
  /* other options */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.headers && req.headers.token) {
    jsonwebtoken.verify(req.headers.token, 'RESTFULAPIs', function (err, decode) {
      if (err) {
        req.user = undefined;
        res.status(404).send({ message: "Invalid Token!" })
      }
      req.user = decode;
      // console.log("decode in side server.js", decode)
      next();
    });
  } else {
    console.log("req.user in side server.js", req.user)
    req.user = undefined;
    next()
  }
});
var routes = require('./api/routes/chatRoutes');
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('Chat RESTful API server started on: ' + port);

module.exports = app;