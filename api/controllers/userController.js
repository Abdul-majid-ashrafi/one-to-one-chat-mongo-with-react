import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const User = mongoose.model('UserTemp');

exports.register = (req, res) => {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
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

exports.sign_in = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (!err) {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      } else {
        user.hash_password = undefined
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs'), message: user });
      }
    } else {
      return res.status(401).json({ message: 'Authentication failed. Unknown database error.' });
    }
  });
};

exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'User not authanticated!' });
  }
};


exports.allUser = (req, res) => {
  User.find({})
    .select('fullName , email , _id , created')
    .exec((err, user) => {
      if (!err) {
        if (!user) {
          return res.status(401).json({ message: 'Find user failed. Unknown database error.' });
        } else {
          return res.json({ user: user })
        }
      } else {
        return res.status(401).json({ message: 'Find user failed.' });
      }
    }
    )
}



