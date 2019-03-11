const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.deleteMatchingGameQuestion = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];
    const video = section.videos[args.videoIndex];

    const matchingGameQuestionsWithDesiredQuestionRemoved = video.matchingGame.questions.filter((questionObj) => {
      return questionObj.matchId !== args.matchId;
    });

    const matchingGameAnswersWithDesiredAnswerRemoved = video.matchingGame.answers.filter((answerObj) => {
      return answerObj.matchId !== args.matchId;
    });

    video.matchingGame.questions = matchingGameQuestionsWithDesiredQuestionRemoved;
    video.matchingGame.answers = matchingGameAnswersWithDesiredAnswerRemoved;

    section.videos[args.videoIndex] = video;
    course.sections.set(args.sectionIndex, section);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
