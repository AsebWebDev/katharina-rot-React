const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
    minlength: 1
  },
  titlePic: {
    type: String,
    default: 'https://community.adobe.com/legacyfs/online/avatars/a754554_Capture.png'
  },
  thumbnail: {
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
  category: {
    type: String,
    default: 'News'
  },
  description: {
    type: String,
  },
  likedSessions: {
    type: [String],
    default: []
  },
  editorState: {
    type: String,
    default: null
  },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;