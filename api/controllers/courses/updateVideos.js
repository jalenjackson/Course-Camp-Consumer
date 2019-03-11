const Course = require('../../models/course');

exports.updateVideos = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          if (course.videos.length > 0) {
            let videos = course.videos;
            let video = videos.find(v => v.referenceId === req.body.referenceId);
            let filteredVideos = videos.filter(v => { return v.referenceId !== req.body.referenceId });
            video.quizId = req.body.quizId;
            filteredVideos.push(video);

            Course.findOneAndUpdate(
                { _id: req.body.courseId },
                { $set: { videos: filteredVideos } },
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
              message: 'no videos found',
            })
          }
        } else {
          res.status(404).json({
            message: 'There was no course found with the provided ID',
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
};
