function seedDB() {
    console.log("Seed News triggered")
    const mongoose = require("mongoose");
    const News = require("../models/News");

    require('../configs/database')

    let news = [
        {
            title: "My first news",
            description: "This is my very first description.",
            isAdmin: true
        },
        {
            title: "My second news",
            description: "This is my very second description.",
            isAdmin: true
        },
    ]

    Promise.all([News.deleteMany()])
    .then (() => News.create(news))
    .then (() => mongoose.disconnect())
    .catch(err => { mongoose.disconnect(); throw err; });
}

seedDB();

module.exports = {
    seedDB
}