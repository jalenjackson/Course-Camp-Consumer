const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.deleteAddQuizQuestion = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const course = await Course.findById(args.courseId);
    const sections = course.sections[args.sectionIndex];
    sections.videos[args.videoIndex].quiz.splice(args.questionIndex, 1);
    course.sections.set(args.sectionIndex, sections);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
