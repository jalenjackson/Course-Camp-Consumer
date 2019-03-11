const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.updateQuizQuestion = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];

    if (args.type === 'Answer') {
      const currentActiveAnswer = section.videos[args.videoIndex].quiz[args.questionIndex].answers.split(',');
      currentActiveAnswer[args.answerIndex] = args.term;

      section.videos[args.videoIndex].quiz[args.questionIndex].answers = currentActiveAnswer.join();
      course.sections.set(args.sectionIndex, section);
    } else {
      section.videos[args.videoIndex].quiz[args.questionIndex].question = args.term;
      if (args.optionalImage !== 'false') section.videos[args.videoIndex].quiz[args.questionIndex].optionalImage = args.optionalImage;
      course.sections.set(args.sectionIndex, section);
    }

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
