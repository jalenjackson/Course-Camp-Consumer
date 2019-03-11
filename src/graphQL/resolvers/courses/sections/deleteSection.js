const Course =  require('../../../../models/course');
const { TransformObject } = require('../merge');

exports.deleteSection = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findById(args.courseId);
    if (course.sections) {
      course.sections.splice(args.sectionIndex, 1)
    } else {
      return {}
    }
    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
