exports.returnFileLocation = (req, res) => {
  try {
    if (req.file.location) {
      const currentSection = req.headers.currentsection;
      res.status(200).json({
        link: req.file.location,
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
