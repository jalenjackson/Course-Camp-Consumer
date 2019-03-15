const Course =  require('../../../../models/course');
const { TransformObject } = require('../merge');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

let s3 = new aws.S3();

exports.deleteVideo = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    s3.deleteObject({ Bucket: 'new-company-videos', Key: args.fileId });

    const course = await Course.findById(args.courseId);
    if (course.sections) {
      const sections = course.sections[args.sectionIndex];
      sections.videos.splice(args.videoIndex, 1);
      course.sections.set(args.sectionIndex, sections)
    } else {
      return {}
    }
    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
