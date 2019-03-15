const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isTheUserAuthenticated = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isTheUserAuthenticated = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (e) {
    req.isTheUserAuthenticated = false;
    return next();
  }
  if (!decodedToken) {
    req.isTheUserAuthenticated = false;
    return next();
  }
  
  req.isTheUserAuthenticated = true;
  req.userId = decodedToken.userId;
  return next();
};
