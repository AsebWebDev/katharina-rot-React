const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSettings = require('../configs/usersettings')

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  profilePic: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  settings: userSettings
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
