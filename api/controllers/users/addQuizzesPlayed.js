const User = require('../../models/user');

exports.addCourseQuizPlayed = (req, res) => {
  const _id = req.body.userId;
  const quizId = req.body.quizId;

  User.findById(_id)
      .exec()
      .then((user) => {
        if (user) {
          user.courseQuizzesPlayed = user.courseQuizzesPlayed || [];
          const courseQuizReference = `${_id}-${quizId}`;
          if(user.courseQuizzesPlayed.find(v => v === courseQuizReference)) {
            res.status(200).json({
              email: user.email,
              customizedTags: user.customizedTags,
              name: user.name,
              userId: user._id,
              overallScore: user.overallScore,
              numberOfPerfectScores: user.numberOfPerfectScores,
              points: user.points,
              videosWatched: user.videosWatched,
              courseQuizzesPlayed: user.courseQuizzesPlayed
            })
          } else {
            user.courseQuizzesPlayed.push(courseQuizReference);
            user.save();
            res.status(200).json({
              email: user.email,
              customizedTags: user.customizedTags,
              name: user.name,
              userId: user._id,
              overallScore: user.overallScore,
              numberOfPerfectScores: user.numberOfPerfectScores,
              points: user.points,
              videosWatched: user.videosWatched,
              courseQuizzesPlayed: user.courseQuizzesPlayed
            })
          }
        } else {
          res.status(404).json({
            message: 'No user found!'
          })
        }
      })
};
