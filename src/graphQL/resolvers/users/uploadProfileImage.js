const User =  require('../../../models/user');
const { TransformObject } = require('./merge');
const { createUserToken } = require('../global/createToken');

exports.uploadProfileImage = async (args, req) => {
  try {
    const user = await User.findById(req.userId);
    user.profileImage = args.image;
    const token = await createUserToken(user);
    const result = await user.save();
    return { token, ...TransformObject(result) };
  } catch (e) {
    throw e;
  }
};