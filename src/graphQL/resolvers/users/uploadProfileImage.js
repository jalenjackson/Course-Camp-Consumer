const User =  require('../../../models/user');
const { TransformObject } = require('./merge');

exports.uploadProfileImage = async (args, req) => {
  try {
    const user = await User.findById(req.userId);
    user.profileImage = args.image;
    const result = await user.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};