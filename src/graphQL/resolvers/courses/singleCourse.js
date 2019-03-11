const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.singleCourse = async (args) => {
  try {
    const course = await Course.findById(args.courseId);
    return TransformObject(course);
  } catch (e) { throw e }
};
