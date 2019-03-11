const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  customizedTags: { type: String, required: true },
  name: { type: String, required: true },
  overallScore: { type: String, required: false, default: '0/0' },
  numberOfPerfectScores: { type: Number, required: false, default: 0 },
  points: { type: Number, required: false, default: 0 },
  password: { type: String, required: true },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpiresIn: { type: Date, required: false },
  organization: { type: String, required: false },
  videosWatched: { type: Array, required: false },
  courseQuizzesPlayed: { type: Array, required: false },
  coursesPayedFor: { type: Object, required: false },
  moneyMade: { type: Number, get: getPrice, set: setPrice, required: false, default: 0 }
});

function getPrice(num){
  return (num/100).toFixed(2);
}

function setPrice(num){
  return num*100;
}

module.exports = mongoose.model('User', userSchema);
