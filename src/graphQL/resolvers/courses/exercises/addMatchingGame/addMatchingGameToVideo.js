const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.addMatchingGameToVideo = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];
    const video = section.videos[args.videoIndex];

    if (!video.matchingGame) {
      video.matchingGame = { questions: [], answers: [] };
    }

    video.matchingGame.questions.push(args.question);
    video.matchingGame.answers.push(args.answer);
    video.matchingGame.timeAllotted = args.timeAllotted;

    section.videos[args.videoIndex] = video;
    course.sections.set(args.sectionIndex, section);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
