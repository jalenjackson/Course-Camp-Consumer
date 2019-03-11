const Blog = require('../../models/blog');

exports.getBlog = (req, res) => {
  const id = req.params.postId;
  Blog.findById(id)
    .select('-__v')
    .exec()
    .then((blog) => {
      if (blog) {
        res.status(200).json({
          blog,
        });
      } else {
        res.status(404).json({
          message: 'There was no blog found with the provided ID',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};
