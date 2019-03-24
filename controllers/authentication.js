const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = function(req, res, next) {
  // User is auth
  // Give token

  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      next(err);
    }

    // If true return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use ' });
    }

    // If false create and save user
    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        next(err);
      }
    });

    // Return response
    res.json({ token: tokenForUser(user) });
  });
};
