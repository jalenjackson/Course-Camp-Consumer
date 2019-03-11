const Course =  require('../../../../../models/course');
const { TransformObject } = require('../../merge');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
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
      s3.deleteObject({ Bucket: 'new-company', Key: videoLink.split('/')[3] }, function(err) {
        if (err) {
          console.log(err)
        }
        console.log('it deleted')
      });
    });

    sections.videos[args.videoIndex].pictureQuiz.splice(args.questionIndex, 1);
    course.sections.set(args.sectionIndex, sections);

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
