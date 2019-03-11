const Tag = require('../../models/tags');

exports.retrieveTag = (req, res) => {
  const name = req.params.tagName.toLowerCase();
  Tag.find({ name })
      .exec()
      .then((tag) => {
        if (tag) {
          // On Quiz Found
          res.status(200).json({
            tag,
          });
        } else {
          res.status(404).json({
            message: 'There was no tag found',
          });
        }
      })
      .catch((error) => {
        // Error occured
        res.status(500).json({
          error,
        });
      });
};
