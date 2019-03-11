const Course = require('../../models/course');

exports.addNewSection = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          if(!course.sections) course.sections = {};
          let tmpCourseSections = course.sections;
          tmpCourseSections[req.body.sectionId] = { title: req.body.title, description: '', category: '', videos: [], position: null }
          Course.findOneAndUpdate(
              { _id: req.body.courseId },
              { $set: { sections: tmpCourseSections } },
              {upsert: true, 'new': true},
              (err, documents) => {
                if (err) {
                  return res.status(500).json({
                    message: 'an unexpected error occurred',
                    err
                  })
                }
                return res.status(200).json({
                  message: 'section added successfully!',
                  documents
                })
              },
          );
        } else {
          return res.status(404).json({
            message: 'No course found'
          })
        }
      });
};
