const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumQuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  sectionIndex: {
    type: Number,
    required: true
  },
  videoIndex: {
    type: Number,
    required: true
  },
  exercise: {
    type: String
  },
  date: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: {
    type: Array
  }
});

module.exports = mongoose.model('ForumQuestion', ForumQuestionSchema);
