const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.updateCourse = async (args, req) => {
  try {
    const { title, description, category, color, price, language, learning, summary } = args.courseInput;

    const course = await Course.findById(args.courseId);

    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (color) course.color = color;
    if (price) course.price = price;
    if (language) course.language = language;
    if (learning) course.learning = learning;
    if (summary) course.summary = summary;

    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
