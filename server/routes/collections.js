const express = require('express');
const Collection = require('../models/Collection')
const {isLoggedIn, isAdmin} = require('../middlewares')
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log("hit!")
  Collection.find()
    .then(collections => {
      console.log(collections)
      res.json(collections);
    })
    .catch(err => next(err))
});

//TODO: protect route (is admin?)
router.post('/:id/delete', isAdmin, (req, res, next) => {
  console.log("Hit Delete-ID: "+ req.params.id)
  Collection.deleteOne( { _id : req.params.id } )
  .then(result => {
    res.json({
      success: true,
      result
    });
  })
  .catch(err => next(err))
});

//TODO: protect route (is admin?)
router.put('/:id/edit', isAdmin, (req, res, next) => {
  console.log("Hit Edit-ID: "+ req.params.id)
  Collection.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    titlePic: req.body.titlePic,
    pictures: req.body.pictures,
    tags: req.body.tags,
    description: req.body.description,
  }, { new: true }) // To access the updated collection (and not the old collection)
    .then(collection => {
      res.json({
        message: "Your collection has been updated",
        collection
      })
    })
    .catch(err => next(err))
});

//TODO: protect route (is admin?)
router.post('/', isAdmin, (req, res, next) => {
  let { title, titlePic, pictures, tags, description } = req.body
  Collection.create({ title, titlePic, pictures, tags, description })
    .then(Collection => {
      res.json({
        success: true,
        Collection
      });
    })
    .catch(err => next(err))
});

module.exports = router;
