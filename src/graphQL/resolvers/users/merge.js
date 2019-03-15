const Course = require('../../../models/course');
const { TransformObject } = require('../courses/merge');

const TransformObjectUser = k => {
  return {
    ...k._doc,
    paidCourses: MongoFindPaidCourses.bind(this, k._doc.paidCourses),
    createdCourses: MongoFindPaidCourses.bind(this, k._doc.createdCourses)
  }
};

const MongoFindPaidCourses = async courseIds => {
  try {
    const courses = await Course.find({ _id: { $in: courseIds }});
    return courses.map(course => {
      return TransformObject(course);
    });
  } catch (e) { throw e }
};

exports.TransformObject = TransformObjectUser;
