const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares')
const News = require('../models/News')
const Collection = require('../models/Collection')
const router = express.Router();
const mongoose = require('mongoose');

router.post('/checkheart', (req, res, next) => {
  const GroupModel = mongoose.model(req.body.type)
  GroupModel.findById(req.body.targetId)
      .then(foundGroupModel => {
        let likedSessions = foundGroupModel.likedSessions;      // array with sessionIDs that already did a like 
        let indexOfId = likedSessions.indexOf(req.sessionID);   // get the Index of Session ID. -1 = not found
        (indexOfId !== -1) ? res.json(true) : res.json(false)   // already liked = return true, not liked yet = return false
      }).catch(err => next(err))
});

router.post('/heart', (req, res, next) => {
  const GroupModel = mongoose.model(req.body.type)
  GroupModel.findById(req.body.targetId)
      .then(foundGroupModel => {
        let likedSessions = foundGroupModel.likedSessions;      // array with sessionIDs that already did a like
        let indexOfId = likedSessions.indexOf(req.sessionID);   // get the Index of Session ID. -1 = not found
        if (indexOfId !== -1) likedSessions.splice(indexOfId,1) // if session ID is found in array remove it
        else likedSessions.push(req.sessionID)                  // if session ID is not found, add it
        GroupModel.findByIdAndUpdate(req.body.targetId, {       // Update Database
          likedSessions
        }, { new: true }) // To access the updated Target (and not the old target)
          .then(result => res.json(result))
          .catch(err => next(err))
      }).catch(err => next(err))
});

module.exports = router;
