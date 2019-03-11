const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.addAnotherQuizQuestionToQuiz = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];
    const video = section.videos[args.videoIndex];

    const quizAnswers = video.quiz[args.questionIndex].answers.split(',');
    quizAnswers.push(args.term);

    section.videos[args.videoIndex].quiz[args.questionIndex].answers = quizAnswers.join();
    course.sections.set(args.sectionIndex, section);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
