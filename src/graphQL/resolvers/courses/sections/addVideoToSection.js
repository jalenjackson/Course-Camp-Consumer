const Course =  require('../../../../models/course');
const { TransformObject } = require('../merge');

exports.addVideoToSection = async (args, req) => {
  try {
    const updateElementByIndex = `sections.${ String(args.sectionIndex) }.videos`;
    const result = await Course.findOneAndUpdate(
      { _id: args.courseId },
      { $push: { [updateElementByIndex]: {
        title: args.videoInput.title,
        description: args.videoInput.description,
        videoLocation: args.videoInput.videoLocation
      } }},
      { upsert: true, 'new': true },
    );
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
