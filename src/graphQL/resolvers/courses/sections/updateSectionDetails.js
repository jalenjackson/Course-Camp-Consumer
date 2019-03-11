const Course =  require('../../../../models/course');
const { TransformObject } = require('../merge');

exports.updateSectionDetails = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }

    const { title, description, category } = args.sectionInput;

    const course = await Course.findById(args.courseId);
    const section = course.sections[args.sectionIndex];

    if (title) section.title = title;
    if (description) section.description = description;
    if (category) section.category = category;

    course.sections.set(args.sectionIndex, section);

    const result = await course.save();

    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
