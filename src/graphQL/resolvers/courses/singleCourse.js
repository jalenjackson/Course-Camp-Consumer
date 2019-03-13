const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.singleCourse = async (args) => {
  try {
    const course = await Course.find({ '_id': args.courseId, 'publishedCourse': { $exists: true } });
    return TransformObject(course[0]);
  } catch (e) { throw e }
};
