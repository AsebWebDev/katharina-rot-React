const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
    minlength: 1
  },
  titlePic: {
    type: String,
    default: 'https://n-allo.be/wp-content/uploads/2016/08/ef3-placeholder-image-450x350.jpg'
    // required: [true, 'Default Picture URL'],
  },
  pictures: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  description: {
    type: String,
  },
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;