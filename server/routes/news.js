const express = require('express');
const router = express.Router();
const News = require('../models/News')
const {isAdmin} = require('../middlewares')

router.get('/', (req, res, next) => {
    News.find()
    .then(news => { res.json(news);})
    .catch(err => next(err))
});

router.post('/', isAdmin, (req, res, next) => {
    let { title, thumbnail, description, tags} = req.body
    let titlePic
    if (req.body.titlePic) titlePic = req.body.titlePic 
    News.create({ title, titlePic, thumbnail, tags, description })
    .then(news => {  
      res.json({
        success: true,
        news
      });
    })
    .catch(err => next(err))
});

router.post('/:id/delete', isAdmin, (req, res, next) => {
  console.log("Route Delete News hit with id: " + req.params.id)
  News.deleteOne( { _id : req.params.id } )
  .then(result => {
    res.json({
      success: true,
      result
    });
  })
  .catch(err => next(err))
});

module.exports = router;
