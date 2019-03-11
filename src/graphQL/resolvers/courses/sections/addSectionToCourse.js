const Course =  require('../../../../models/course');
const { TransformObject } = require('../merge');

exports.addSectionToCourse = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findOneAndUpdate(
      { _id: args.courseId },
      { $push: { 'sections': {
        title: '',
        description: '',
        category: '',
        videos: []
      } }},
      { upsert: true, 'new': true },
    );
    return TransformObject(course);
  } catch (e) {
    throw e;
  }
};
