const User =  require('../../../models/user');
const { TransformObject } = require('./merge');
const { createUserToken } = require('../global/createToken');

exports.changeUserInfo = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const user = await User.findById(req.userId);
    user.email = args.email;
    user.name = args.name;
    user.token = await createUserToken(user);
    await user.save();
    return TransformObject(user);
  } catch (e) {
    throw e;
  }
};
