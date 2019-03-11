const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  html: { type: String, required: true }
});

module.exports = mongoose.model('Blog', blogSchema);
