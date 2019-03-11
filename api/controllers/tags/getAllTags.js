const Tag = require('../../models/tags');

exports.getAllTags = (req, res) => {
  Tag.find(({ count: { $gt: 3 } }))
    .skip(parseInt(req.query.skipAmount))
    .limit(parseInt(req.query.limit))
    .sort({ count: -1 })
    .exec()
    .then((tags) => {
      const response = {
        count: tags.length,
        tags
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
