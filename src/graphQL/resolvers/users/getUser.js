const User =  require('../../../models/user');
const jwt = require('jsonwebtoken');
const { TransformObject } = require('./merge');

exports.getUser = async (args, req) => {
  try {
    const user = await User.findById(req.userId);
    const token = await jwt.sign({
      userId: user._id,
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3d'
    });
    return { token, ...TransformObject(user) };
  } catch (e) {
    throw e;
  }
};
