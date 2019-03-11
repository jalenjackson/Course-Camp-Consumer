const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');

exports.addCodingChallenge = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];
    const video = section.videos[args.videoIndex];

    video.codingChallenge = {
      title: args.codingChallengeInput.title,
      description: args.codingChallengeInput.description,
      startingFunctionText: args.codingChallengeInput.startingFunctionText,
      returnValue: args.codingChallengeInput.returnValue,
      functionName: args.codingChallengeInput.functionName,
      functionParams: args.codingChallengeInput.functionParams,
      addedFunctionParams: args.codingChallengeInput.addedFunctionParams,
    };

    section.videos[args.videoIndex] = video;
    course.sections.set(args.sectionIndex, section);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
