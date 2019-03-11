const Course = require('../../models/course');

exports.sendFroalaLink = (req, res) => {
  if(req.file && req.file.location) {
    res.status(200).json({
      link: req.file.location
    })
  } else {
    res.status(500).json({
      message: 'An unexpected error occurred'
    })
  }
};
