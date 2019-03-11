exports.verify = (req, res, next) => {
  console.log(req)
  if (req.isTheUserAuthenticated) {
    return next();
  } else {
    res.status(409).json({
      unauthenticated: true
    });
  }
};
