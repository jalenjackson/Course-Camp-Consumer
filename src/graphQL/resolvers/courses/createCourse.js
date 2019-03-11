const Course =  require('../../../models/course');
const User =  require('../../../models/user');
const { TransformObject } = require('./merge');

exports.createCourse = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const course = new Course({
      title: args.courseInput.title,
      description: args.courseInput.description,
      category: args.courseInput.category,
      color: args.courseInput.color,
      price: +args.courseInput.price,
      language: args.courseInput.language,
      learning: args.courseInput.learning,
      date: new Date().toISOString(),
      status: 'Unpublished',
      rating: +args.courseInput.rating,
      creator: req.userId,
      summary: args.courseInput.summary
    });
    let createdCourse;
    const result = await course.save();
    createdCourse = TransformObject(result);
    const user = await User.findById(req.userId);
    if(!user) { throw new Error('User does not exist') }
    user.createdCourses.push(course);
    await user.save();
    return createdCourse;
  } catch (e) {
    throw e
  }
};
