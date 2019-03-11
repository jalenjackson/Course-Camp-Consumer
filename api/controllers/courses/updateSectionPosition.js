const Course = require('../../models/course');

exports.updateSectionPosition = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          Course.findOneAndUpdate(
              { _id: req.body.courseId },
              { $set: { sections: req.body.newSections } },
              {upsert: true, 'new': true},
              (err, documents) => {
                if (err) {
                  return res.status(500).json({
                    message: 'an unexpected error occurred',
                    err
                  })
                }
                return res.status(200).json({
                  message: 'Course video successfully updated',
                  documents
                })
              },
          );
        } else {
          res.status(404).json({
            message: 'Course not found!'
          })
        }
      })
};
