const express = require('express');
const Collection = require('../models/Collection')
const {isAdmin} = require('../middlewares')
const router = express.Router();
// const { seedDB } = require('../bin/seeds')

router.get('/', (req, res, next) => {
  Collection.find()
    .then(collections => {
      // if (collections.length < 1) seedDB(); // automatic reseed
      res.json(collections);
    })
    .catch(err => next(err))
});

router.post('/:id/delete', isAdmin, (req, res, next) => {
  Collection.deleteOne( { _id : req.params.id } )
  .then(result => {
    res.json({
      success: true,
      result
    });
  })
  .catch(err => next(err))
});

router.post('/:id/', isAdmin, (req, res, next) => {
  Collection.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    titlePic: req.body.titlePic,
    pictures: req.body.pictures,
    tags: req.body.tags.filter(tag => tag !== ''), // filter all blank spaces from array
    description: req.body.description,
    editorState: req.body.editorState,
  }, { new: true }) // To access the updated collection (and not the old collection)
    .then(collection => {
      Collection.find()
      .then(collections => { res.json({ collections }) })
    }).catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  Collection.findById(req.params.id) // To access the updated collection (and not the old collection)
    .then(collection => { res.json({ message: "SUCCESS", collection }) })
    .catch(err => next(err))
});

router.post('/', isAdmin, (req, res, next) => {
  let { title, pictures, description, tags, editorState} = req.body
  let titlePic;
  if (req.body.titlePic) titlePic = req.body.titlePic // leave undefined if not provided, so Mongoose default is set
  Collection.create({ title, titlePic, pictures, tags, description,   editorState })
    .then(Collection => { res.json({ success: true, Collection }) })
    .catch(err => next(err))
});

module.exports = router;
