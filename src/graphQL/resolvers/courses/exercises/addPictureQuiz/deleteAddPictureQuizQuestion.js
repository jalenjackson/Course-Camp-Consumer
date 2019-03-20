const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_COURSE_CAMP,
  accessKeyId: process.env.AWS_ACCESS_KEY_COURSE_CAMP,
  region: 'us-east-1',
});

let s3 = new aws.S3();

exports.deleteAddPictureQuizQuestion = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const course = await Course.findById(args.courseId);
    const sections = course.sections[args.sectionIndex];


    sections.videos[args.videoIndex].pictureQuiz[args.questionIndex].answers.split(',').map((videoLink) => {
      s3.deleteObject({ Bucket: 'new-company', Key: videoLink.split('/')[3] });
    });

    sections.videos[args.videoIndex].pictureQuiz.splice(args.questionIndex, 1);
    course.sections.set(args.sectionIndex, sections);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
