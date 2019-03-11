const Course = require('../../../models/course');

const TransformObject = k => {
  return {
    ...k._doc,
    paidCourses: MongoFindPaidCourses.bind(this, k._doc.paidCourses)
  }
};

const MongoFindPaidCourses = async courseIds => {
  try {
    const courses = await Course.find({ _id: { $in: courseIds }});
    return courses.map(course => {
      return course;
    });
  } catch (e) { throw e }
};

exports.TransformObject = TransformObject;
