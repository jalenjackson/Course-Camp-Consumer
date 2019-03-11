const Course =  require('../../../../models/course');
const { TransformObject } = require('../merge');

exports.updateVideoDetails = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const { title, description } = args.videoInput;

    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];

    if (title) section.videos[args.videoIndex].title = title;
    if (description) section.videos[args.videoIndex].description = description;

    course.sections.set(args.sectionIndex, section);

    const result = await course.save();

    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
