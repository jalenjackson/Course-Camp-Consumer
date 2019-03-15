const Course =  require('../../models/course');

exports.call = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    course.sections = req.body.newSections;
    await course.save();
    res.status(200).json({ message: 'Successfully reordered sections' });
  } catch (e) {
    res.status(500).json({ error: true });
  }
};
