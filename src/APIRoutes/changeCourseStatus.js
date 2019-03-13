const Course =  require('../models/course');

exports.call = async (req, res) => {
  const course = await Course.findById(req.body.courseId);
  course.status = req.body.status;

  switch(req.body.status) {
    case 'Unpublished': {
      course.reviewCourse = {};
      await course.save();
      return success(res);
    }
    case 'Reviewing': {
      course.reviewCourse = req.body.course;
      await course.save();
      return success(res);
    }
    case 'Approved': {
      course.publishedCourse = course.reviewCourse;
      course.reviewCourse = {};
      await course.save();
      return success(res);
    }
  }

  await course.save();
  return success(res);
};

const success = res => {
  return res.status(200).json({
    message: 'course status successfully updated'
  });
};
