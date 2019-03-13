const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
  },
  learning: {
    type: String,
  },
  language: {
    type: String,
  },
  summary: {
    type: String
  },
  sections: {
    type: Array
  },
  status: {
    type: String // Unpublished, Reviewing, Approved, Published
  },
  reviewCourse: {
    type: Object
  },
  publishedCourse: {
    type: Object
  },
  studentsEnrolled: {
    type: Number
  },
  reviews: {
    type: Array
  }
});

module.exports = mongoose.model('Course', CourseSchema);
