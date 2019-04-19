const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
    minlength: 1
  },
  titlePic: {
    type: String,
    required: [true, 'Default Picture URL'],
  },
  pictures: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  area: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;