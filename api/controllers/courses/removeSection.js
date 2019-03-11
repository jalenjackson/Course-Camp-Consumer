const Course = require('../../models/course');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

let s3 = new aws.S3();

exports.removeSection = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          let tmpSections = course.sections;

          tmpSections[req.body.sectionId].videos.map((video) => {
            let params = {  Bucket: 'brainflop-videos', Key: video.videoLocation.split('/')[3] };
            s3.deleteObject(params, function(err, data) {
              if(err) console.log(err)
            });
          });

          delete tmpSections[req.body.sectionId];
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
                  message: 'section successfully deleted!',
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
