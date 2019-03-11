const Course = require('../../models/course');

exports.addPictureAnswerQuiz = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          let tmpSections = course.sections;

          if(tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).pictureQuiz) {
            let quiz = tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).pictureQuiz;
            quiz.title = req.body.title;
            quiz.quizQuestions.push({
              question: req.body.question,
              pictureAnswer1: req.files.pictureAnswer1[0].location,
              pictureAnswer2: req.files.pictureAnswer2[0].location,
              pictureAnswer3: req.files.pictureAnswer3[0].location,
              pictureAnswer4: req.files.pictureAnswer4[0].location
            });
            tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).pictureQuiz = quiz;
          } else {
            tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).pictureQuiz = {
              title: req.body.title,
              quizQuestions: [{
                question: req.body.question,
                pictureAnswer1: req.files.pictureAnswer1[0].location,
                pictureAnswer2: req.files.pictureAnswer2[0].location,
                pictureAnswer3: req.files.pictureAnswer3[0].location,
                pictureAnswer4: req.files.pictureAnswer4[0].location
              }]
            }
          }

          Course.findOneAndUpdate(
              { _id: req.body.courseId },
              { $set: { sections: tmpSections } },
              {upsert: true, 'new': true},
              (err, documents) => {
                if (err) {
                  return res.status(500).json({
                    message: 'an unexpected error occurred',
                    err
                  })
                }
                return res.status(200).json({
                  message: 'Course video successfully updated',
                  documents
                })
              },
          );
        } else {
          res.status(404).json({
            message: 'There was no course found with the provided ID',
          });
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          error,
        });
      });
};
