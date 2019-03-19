const User =  require('../../../models/user');
const { TransformObject } = require('./merge');

exports.findUserByForgotPassword = async (args, req) => {
  try {
    const getUser = await User.find({ 'forgotPasswordToken': args.token });
    const user = getUser[0];
    
    console.log(user);
    console.log(args.token)
    
    if (!user) {
      throw new Error('token invalid');
    }
    
    const currentDate = new Date();
    const tokenDate = new Date(user.forgotPasswordDate);
    
    if (currentDate > tokenDate) {
      throw new Error('token is expired');
    }
    
    return TransformObject(user);
  } catch (e) {
    throw e;
  }
};
