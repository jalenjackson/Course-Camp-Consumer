const User = require('../../models/user');

exports.addCourseVideosWatched = (req, res) => {
  const _id = req.body.userId;
  const videoId = req.body.videoId;
  const quizId = req.body.quizId;

  User.findById(_id)
      .exec()
      .then((user) => {
        if (user) {
          user.videosWatched = user.videosWatched || [];
          const videoReference = `${_id}-${videoId}`;
          if(user.videosWatched.find(v => v === videoReference)) {
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
            user.videosWatched.push(videoReference);
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
