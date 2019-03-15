const jwt = require('jsonwebtoken');

exports.createUserToken = async user => {
  return await jwt.sign({
    userId: user.id,
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
};