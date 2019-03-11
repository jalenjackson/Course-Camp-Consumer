const User =  require('../../../models/user');
const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.getUser = async (args, req) => {
  try {
    const user = await User.findById(req.userId);
    return TransformObject(user);
  } catch (e) {
    throw e;
  }
};
