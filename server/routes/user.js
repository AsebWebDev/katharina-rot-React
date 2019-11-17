const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares')
const User = require("../models/User")

router.post('/:id/settings', isLoggedIn, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { settings: req.body })
    .then(userDoc => {
      if (!userDoc) {
        next(new Error("Could not find user settings."))
        return
      } 

      userDoc.password = null   // Do not send encrypted password in result
      res.json(userDoc)
    })
    .catch(err => next(err))
});

module.exports = router;
