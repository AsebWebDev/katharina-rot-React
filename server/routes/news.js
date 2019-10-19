const express = require('express');
const router = express.Router();
const News = require('../models/News')

router.get('/', (req, res, next) => {
    console.log("News route hit.")
    News.find()
    .then(news => { res.json(news);})
    .catch(err => next(err))
});

module.exports = router;
