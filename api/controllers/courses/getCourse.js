const Course = require('../../models/course');

exports.getCourse = (req, res) => {
  const id = req.params.courseId;
  Course.findById(id)
      .select('-__v')
      .exec()
      .then((course) => {
        if (course) {
          // On Quiz Found
          res.status(200).json({
            course
          });
        } else {
          // When quiz was not found
          res.status(404).json({
            message: 'There was no course found with the provided ID',
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
