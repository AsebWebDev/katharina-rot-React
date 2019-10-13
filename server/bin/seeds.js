function seedDB() {
    console.log("Seed triggered")
    const mongoose = require("mongoose");
    const Collection = require("../models/Collection");
    const User = require("../models/User");
    const bcrypt = require("bcrypt");
    const bcryptRounds = 10;

    require('../configs/database')

    let users = [
        {
          username: "admin",
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(bcryptRounds)),
          isAdmin: true
        }
    ]
    
    // let collections = []

    // for (let i = 0; i < 30; i++) {
    //     collections.push({
    //         title: "Title " +  i,
    //         titlePic: "https://community.adobe.com/legacyfs/online/avatars/a754554_Capture.png",
    //         pictures: ["https://picsum.photos/id/379/200/200", "https://picsum.photos/id/379/200/200", "https://picsum.photos/id/379/200/200", "https://picsum.photos/id/379/200/200"],
    //         tags: [],
    //         description: "Description Number " + i 
    //     })
    // }

    // Promise.all([Collection.deleteMany()])
    // .then (() => Collection.create(collections))
    // .then (() => mongoose.disconnect())
    // .catch(err => { mongoose.disconnect(); throw err; });

    Promise.all([User.deleteMany()])
    .then (() => User.create(users))
    .then (() => mongoose.disconnect())
    .catch(err => { mongoose.disconnect(); throw err; });
}

seedDB();

module.exports = {
    seedDB
}