const mongoose = require('mongoose');
const Course = require('../../models/course');
const User = require('../../models/user');
const CourseCategory = require('../../models/courseCategories');

exports.createNewCourse = (req, res) => {
  const tags = req.body.tags.split(',');

  CourseCategory.find({ name: { $in: tags } })
      .then((foundTags) => {
        tags.map((tag) => {
          let check = foundTags => foundTags.name === tag;
          if (!foundTags.some(check)) {
            const newTag = new CourseCategory({
              _id: new mongoose.Types.ObjectId(),
              name: tag,
              count: 1,
            });
            return newTag.save();
          }
        });

        foundTags.map((foundTag) => {
          return CourseCategory.updateOne(
              { _id: foundTag._id },
              { $set: { count: foundTag.count + 1 } },
              (err) => {
                if (err) throw err;
              },
          );
        });
      });



  User.findById(req.body.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found!',
          });
        }
        const course = new Course({
          _id: new mongoose.Types.ObjectId(),
          userId: req.body.userId,
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags,
          courseImage: req.file.location,
          hex: req.body.hex,
          price: req.body.price,
          sections: {}
        });
        return course.save();
      })
      .then((result) => {
        res.status(201).json({
          message: 'Created course successfully!',
          createdCourse: {
            _id: result._id,
            title: result.title,
            description: result.description,
            userId: result.userId,
            tags: result.tags,
            courseImage: result.courseImage,
            hex: result.hex,
            price: result.price,
            sections: {}
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
};
