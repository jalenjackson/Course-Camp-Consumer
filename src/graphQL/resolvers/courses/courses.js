const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.courses = async args => {
  try {
    const courses = await
      Course.find({ 'status': 'Approved' })
      .skip(args.skip ? args.skip : 0)
      .limit(args.limit ? args.limit : 0);
    
    return courses.map(course => {
      return TransformObject(course)
    });
  } catch (e) { throw e }
};
