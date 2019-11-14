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
    let { title, thumbnail, description, tags, pictures, editorState} = req.body
    let titlePic
    if (req.body.titlePic) titlePic = req.body.titlePic 
    News.create({ title, titlePic, thumbnail, tags, description, pictures, editorState })
    .then(news => { res.json({ success: true, news}) })
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  News.findById(req.params.id) // To access the updated collection (and not the old collection)
    .then(news => { res.json({ message: "SUCCESS", news }) })
    .catch(err => next(err))
});

router.post('/:id/delete', isAdmin, (req, res, next) => {
  News.deleteOne( { _id : req.params.id } )
  .then(result => res.json({ success: true, result}))
  .catch(err => next(err))
});

module.exports = router;
