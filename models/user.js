const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define a model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save Hook, ecrypt password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(candidiatePassword, callback) {
  bcrypt.compare(candidiatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export
module.exports = ModelClass;
