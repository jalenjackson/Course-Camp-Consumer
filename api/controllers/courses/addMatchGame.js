const Course = require('../../models/course');

exports.addMatchGame = (req, res) => {
  Course.findById(req.body.courseId)
      .exec()
      .then((course) => {
        if (course) {
          let tmpSections = course.sections;

          if(tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).matchGame) {
            let matchGame = tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).matchGame;
            matchGame.quizQuestions.push({ question: req.body.question, matchId: req.body.matchId });
            matchGame.quizAnswers.push({ answer: req.body.answer, matchId: req.body.matchId, optionalImage: req.file ? req.file.location : null });
            tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).matchGame = matchGame;
          } else {
            tmpSections[req.body.sectionId].videos.find(v => { return v.videoId === req.body.oldVideoId }).matchGame = {
              quizQuestions: [
                { question: req.body.question, matchId: req.body.matchId }
              ],
              quizAnswers: [
                { answer: req.body.answer, matchId: req.body.matchId, optionalImage: req.file ? req.file.location : null }
              ]
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
