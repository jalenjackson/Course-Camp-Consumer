exports.returnFileLocation = (req, res) => {
  try {
    if (req.file.location) {
      const link = `https://djcdxouzulxic.cloudfront.net/${ req.file.originalname }`;
      const currentSection = req.headers.currentsection;
      res.status(200).json({
        link,
        currentSection
      });
    } else {
      res.status(500).json({
        error: true
      })
    }
  } catch (e) {
    res.status(500).json({
      error: true
    })
  }
};
