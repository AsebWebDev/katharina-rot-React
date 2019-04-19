const express = require('express');
const Art = require('../models/Art')

const router = express.Router();

router.get('/', (req, res, next) => {
  Art.find()
    .then(arts => {
      res.json(arts);
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  let { title, titlePic, pictures, tags, description } = req.body
  Art.create({ title, titlePic, pictures, tags, description })
    .then(Art => {
      res.json({
        success: true,
        Art
      });
    })
    .catch(err => next(err))
});

module.exports = router;
