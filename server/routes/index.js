const express = require('express');
const { isLoggedIn } = require('../middlewares')
const News = require('../models/News')
const router = express.Router();

router.get('/admin', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.post('/checkheart', (req, res, next) => {
  console.log(req.body)
  // NEWS 
  switch (req.body.type) {
    case 'news': {
      News.findById(req.body.targetId)
      .then(foundNews => {
        let likedSessions = foundNews.likedSessions;            // array with sessionIDs that already liked this News
        let indexOfId = likedSessions.indexOf(req.sessionID);   // get the Index of Session ID. -1 = not found
        (indexOfId !== -1) ? res.json(true) : res.json(false)            // already liked = return true, not liked yet = return false
      }).catch(err => next(err))
    }; break;
    default: console.log("Default")
  }
  // ...
});

router.post('/heart', (req, res, next) => {
  // NEWS 
  switch (req.body.type) {
    case 'news': {
      News.findById(req.body.targetId)
      .then(foundNews => {
        let likedSessions = foundNews.likedSessions;            // array with sessionIDs that already liked this News
        let indexOfId = likedSessions.indexOf(req.sessionID);   // get the Index of Session ID. -1 = not found
        if (indexOfId !== -1) likedSessions.splice(indexOfId,1) // if session ID is found in array remove it
        else likedSessions.push(req.sessionID)                  // if session ID is not found, add it
        News.findByIdAndUpdate(req.body.targetId, {             // Update Database of this News
          likedSessions
        }, { new: true }) // To access the updated News (and not the old news)
          .then(news => res.json(news.likedSessions.length))
          .catch(err => next(err))
      }).catch(err => next(err))
    }; break;
    default: console.log("Default")
  }
  // ...
});

module.exports = router;
