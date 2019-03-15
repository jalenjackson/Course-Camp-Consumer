const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

let s3 = new aws.S3();

exports.updatePictureQuizQuestion = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];

    if (args.type === 'Answer') {
      const currentActiveAnswer = section.videos[args.videoIndex].pictureQuiz[args.questionIndex].answers.split(',');

      s3.deleteObject({ Bucket: 'new-company', Key: currentActiveAnswer[args.answerIndex].split('/')[3] });

      currentActiveAnswer[args.answerIndex] = args.term;

      section.videos[args.videoIndex].pictureQuiz[args.questionIndex].answers = currentActiveAnswer.join();
      course.sections.set(args.sectionIndex, section);
    } else {
      section.videos[args.videoIndex].pictureQuiz[args.questionIndex].question = args.term;
      course.sections.set(args.sectionIndex, section);
    }

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
