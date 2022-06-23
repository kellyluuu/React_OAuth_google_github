// Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6


const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);


/* -------------------------------------------------------------------------- */
/*                         ADDING HOOK TO YOUR SCHEMA                         */
/* -------------------------------------------------------------------------- */
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  },
});




userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) { // cant use arrow function here
  bcrypt.compare(tryPassword, this.password, cb);
};

const User = mongoose.model("User", userSchema);
module.exports = User;