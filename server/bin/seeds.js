const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require("mongoose");
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

require('../configs/database')

let users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt)),
    isAdmin: true
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })