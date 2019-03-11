const mongoose = require('mongoose');

const courseCategorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  count: { type: Number, required: true },
});

module.exports = mongoose.model('courseCategory', courseCategorySchema);
