exports.verify = (req, res, next) => {
  if (req.isTheUserAuthenticated) {
    return next();
  } else {
    res.status(409).json({
      unauthenticated: true
    });
  }
};
