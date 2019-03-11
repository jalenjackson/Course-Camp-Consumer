const Course = require('../../models/course');

exports.addVideoToSection = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          let tmpSections = course.sections;
          if(tmpSections[req.body.sectionId].videos) {
            tmpSections[req.body.sectionId].videos.push({
              title: req.body.title,
              description: req.body.description,
              videoLocation: req.file.location,
              videoId: req.body.videoId,
            });
          } else {
            tmpSections[req.body.sectionId].videos = [{
              title: req.body.title,
              description: req.body.description,
              videoLocation: req.file.location,
              videoId: req.body.videoId,
            }];
          }

          Course.findOneAndUpdate(
              { _id: req.body.courseId },
              { $set: { sections: tmpSections } },
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
            message: 'There was no course found with the provided ID',
          });
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          error,
        });
      });
};
