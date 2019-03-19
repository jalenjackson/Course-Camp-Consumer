const User =  require('../../../models/user');
const crypto = require('crypto');
const { sendEmail } = require('../../helpers/sendEmail');
const { emailTemplate } = require('../../helpers/emailTemplates/forgotPassword');
const { TransformObject } = require('./merge');

exports.forgotPassword = async (args, req) => {
  try {
    const getUser = await User.find({ 'email': args.email });
    const user = getUser[0];
    
    if (!user) {
      throw new Error('user not found');
    }
    
    var token = crypto.randomBytes(10).toString('hex');
    var tokenDate = new Date();
    tokenDate.setHours(tokenDate.getHours() + 1);
    
    user.forgotPasswordToken = token;
    user.forgotPasswordDate = tokenDate;
    
    await user.save();
    
    sendEmail(user.email, 'You requested a password reset!', emailTemplate(token));
    
    return TransformObject(user);
  
  } catch (e) {
    throw e;
  }
};
