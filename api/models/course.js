const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: true },
  courseImage: { type: String, required: true },
  sections: { type: Object, required: false },
  hex: { type: String, required: false },
  price : {type: Number, get: getPrice, set: setPrice },
});

function getPrice(num){
  return (num/100).toFixed(2);
}

function setPrice(num){
  return num*100;
}

module.exports = mongoose.model('Course', courseSchema);
