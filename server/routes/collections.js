const express = require('express');
const Collection = require('../models/Collection')

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
router.post('/', (req, res, next) => {
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
