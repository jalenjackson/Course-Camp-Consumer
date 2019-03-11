const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.addQuizQuestionToVideo = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];
    const video = section.videos[args.videoIndex];

    const questionObj = {
      question: args.question,
      answers: args.answers,
      optionalImage: args.optionalImage
    };

    video.quiz ? video.quiz.push(questionObj) : video.quiz = [questionObj];

    section.videos[args.videoIndex] = video;
    course.sections.set(args.sectionIndex, section);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
