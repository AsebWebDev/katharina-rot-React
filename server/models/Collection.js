const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
    minlength: 1
  },
  titlePic: {
    type: String,
    default: 'https://community.adobe.com/legacyfs/online/avatars/a754554_Capture.png'
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
    default: ''
  },
  likedSessions: {
    type: [String],
    default: []
  },
  editorState: {
    type: String,
    default: null
  },
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;