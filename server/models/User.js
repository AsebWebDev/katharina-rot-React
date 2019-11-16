const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  settings: {
    type: Object,
    default: {
      Design: { 
        boxShadow: {
          val: false, name: "Box Shadow"
        },
        theme: {
          val: "light", name: "Theme"
        }
      },
      Performance: {
        numberOfNewsToDisplay: {
          val: 10, name: "Number of News to display"
        },
      }
    }
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
