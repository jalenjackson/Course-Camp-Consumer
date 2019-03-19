const User =  require('../../../models/user');
const { TransformObject } = require('./merge');
const bcrypt = require('bcryptjs');

exports.changePassword = async args => {
  try {
    const user = await User.findById(args.userId);
    user.password = await bcrypt.hash(args.password, 12);
    
    await user.save();
    return TransformObject(user);
  } catch (e) {
    throw e;
  }
};
