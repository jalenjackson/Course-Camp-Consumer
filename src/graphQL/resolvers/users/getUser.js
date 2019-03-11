const User =  require('../../../models/user');
const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');

exports.getUser = async (args, req) => {
  try {
    const user = await User.findById('5c7089f44b5d515c8caad3de');
    return TransformObject(user);
  } catch (e) {
    throw e;
  }
};
