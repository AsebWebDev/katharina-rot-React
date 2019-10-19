const express = require('express');
const router = express.Router();
const News = require('../models/News')

router.get('/', (req, res, next) => {
    console.log("News route hit.")
    News.find()
    .then(news => { res.json(news);})
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
    let { title, description, tags} = req.body
    console.log("News POST route hit.")
    console.log(req.body)
    let titlePic;
    if (req.body.titlePic) titlePic = req.body.titlePic 
    News.create({ title, titlePic, tags, description })
    .then(news => {
      console.log(news)
      res.json({
        success: true,
        news
      });
    })
    .catch(err => next(err))
});

module.exports = router;
