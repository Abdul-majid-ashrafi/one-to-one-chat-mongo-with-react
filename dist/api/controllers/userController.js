'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('UserTemp');

exports.register = function (req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = _bcrypt2.default.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.sign_in = function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!err) {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      } else {
        user.hash_password = undefined;
        return res.json({ token: _jsonwebtoken2.default.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs'), message: user });
      }
    } else {
      return res.status(401).json({ message: 'Authentication failed. Unknown database error.' });
    }
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'User not authanticated!' });
  }
};

exports.allUser = function (req, res) {
  User.find({}).select('fullName , email , _id , created').exec(function (err, user) {
    if (!err) {
      if (!user) {
        return res.status(401).json({ message: 'Find user failed. Unknown database error.' });
      } else {
        return res.json({ user: user });
      }
    } else {
      return res.status(401).json({ message: 'Find user failed.' });
    }
  });
};