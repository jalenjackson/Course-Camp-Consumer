const mongoose = require('mongoose');
const Blog = require('../../models/blog');

exports.createBlog = (req, res) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    html: req.body.html,
  });

  blog.save()
      .then((res) => {
      });

  return res.status(201).json({
    message: 'Created blog successfully!',
  });

};
