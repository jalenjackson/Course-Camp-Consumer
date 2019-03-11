const Course = require('../../models/course');

exports.getAllCourses = (req, res) => {
  Course.find()
      .exec()
      .then((courses) => {
        const response = {
          courses: courses.map((course) => {
            return {
              _id: course._id,
              userId: course.userId,
              title: course.title,
              tags: course.tags,
              hex: course.hex,
              courseImage: course.courseImage,
              description: course.description,
              price: course.price
            };
          }),
        };
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
};
