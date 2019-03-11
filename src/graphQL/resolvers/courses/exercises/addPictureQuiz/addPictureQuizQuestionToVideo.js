const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.addPictureQuizQuestionToVideo = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];
    const video = section.videos[args.videoIndex];

    const questionObj = {
      question: args.question,
      answers: args.answers
    };

    video.pictureQuiz ? video.pictureQuiz.push(questionObj) : video.pictureQuiz = [questionObj];

    section.videos[args.videoIndex] = video;
    course.sections.set(args.sectionIndex, section);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
