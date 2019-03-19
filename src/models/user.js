const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  createdForumQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ForumQuestion'
    }
  ],
  isBusinessAccount: {
    type: Boolean,
    default: false
  },
  paidCourses: {
    type: Array
  },
  moneyMade: {
    type: Number
  },
  courseProgress: {
    type: Array
  },
  xp: {
    type: Number
  },
  payoutHistory: {
    type: Array
  },
  profileImage: {
    type: String
  },
  forgotPasswordToken: {
    type: String
  },
  forgotPasswordDate: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
