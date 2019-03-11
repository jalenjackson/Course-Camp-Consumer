const Course = require('../../models/course');

exports.updateCourse = (req, res) => {
  Course.findOneAndUpdate(
      { _id: req.body.courseId },
      { $push: {'videos': { s3Location: req.file.location, quizId: null, position: null, referenceId: req.body.referenceId, thumbnail: req.file.thumbnailS3Location }}},
      {upsert: true, 'new': true},
      (err, course) => {
        if (err) {
          return res.status(500).json({
            err
          })
        }
        return res.status(200).json({
          course,
          currentVideos3Location: req.file.location
        })
      }
  )
};
