const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.courseByStatus = async (args) => {
  try {
    const courses = await Course.find({ 'status': args.status });
    return courses.map(course => {
      return TransformObject(course)
    });
  } catch (e) { throw e }
};
