const User = require('../../../models/user');
const Course =  require('../../../models/course');
const { dateToString } = require('../../helpers/date');

const MongoFindUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      password: null,
      createdCourses: MongoFindCourses.bind(this, user._doc.createdCourses),
    }
  } catch (e) { throw e }
};

const MongoFindCourses = async courseIds => {
  try {
    const courses = await Course.find({ _id: { $in: courseIds }});
    return courses.map(course => {
      return TransformObject(course);
    });
  } catch (e) { throw e }
};

const MongoFindSingleCourse = async courseId => {
  try {
    const course = await Course.findById(courseId);
    return TransformObject(course);
  } catch (e) { throw e }
};

const TransformObject = k => {
  return {
    ...k._doc,
    _id: k.id,
    date: dateToString(k._doc.date),
    creator: MongoFindUser.bind(this, k._doc.creator),
    reviews: k._doc.reviews.map(async review => {
      const tmpReview = review;
      tmpReview.userId = await MongoFindUser.bind(this, review.userId);
      return tmpReview;
    })
  }
};

exports.MongoFindUser = MongoFindUser;
exports.MongoFindCourses = MongoFindCourses;
exports.MongoFindSingleCourse = MongoFindSingleCourse;
exports.TransformObject = TransformObject;
