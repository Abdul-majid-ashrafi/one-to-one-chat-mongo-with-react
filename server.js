import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';

import Chat from './api/models/chatModel'
import User from './api/models/userModel'

const port = process.env.PORT || 4000
const app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://addmin:addmin@ds059185.mongolab.com:59185/salesmanapp', {
  useMongoClient: true,
  /* other options */
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    console.log("req.user in side server.js", req.user)
    req.user = undefined;
    next()
  }
});
var routes = require('./api/routes/chatRoutes');
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('Chat RESTful API server started on: ' + port);

module.exports = app;
