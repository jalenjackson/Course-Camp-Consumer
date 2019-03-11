const jwt = require('jsonwebtoken');

exports.createToken = async user => {
  return await jwt.sign({
    userId: user.id,
    email: user.email,
    name: user.name
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
};