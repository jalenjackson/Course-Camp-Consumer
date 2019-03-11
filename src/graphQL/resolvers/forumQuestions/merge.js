const Course =  require('../../../models/course');
const User =  require('../../../models/user');

const MongoFindUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      password: null,
    }
  } catch (e) { throw e }
};

const MongoFindCourse = async courseId => {
  try {
    const course = await Course.findById(courseId);
    return {
      ...course._doc,
      id: course.id,
    }
  } catch (e) { throw e }
};

const TransformObject = k => {
  return {
    ...k._doc,
    _id: k.id,
    course: MongoFindCourse.bind(this, k._doc.course),
    creator: MongoFindUser.bind(this, k._doc.creator),
    answers: k._doc.answers.map(answer => {
      const userId = answer.userId;
      answer.userId = MongoFindUser.bind(this, userId)
      return answer;
    })
  }
};

exports.MongoFindUser = MongoFindUser;
exports.MongoFindCourse = MongoFindCourse;
exports.TransformObject = TransformObject;
