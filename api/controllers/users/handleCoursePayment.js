const User = require('../../models/user');

exports.handleCoursePayment = (req, res) => {
  const updateBuyerPaidCourses = `coursesPayedFor.${req.body.courseId}`;

  User.findOneAndUpdate(
      { _id: req.body.buyerId },
      { $set: {[updateBuyerPaidCourses]: { paid: true }}},
      {upsert: true, 'new': true},
      (err, buyer) => {
        let moneyAfterPercentage = Number(req.body.courseTotalAmount - (req.body.courseTotalAmount * 0.25));
        let moneyMade =  Math.round(moneyAfterPercentage * 100) / 100;
        User.findOneAndUpdate(
            { _id: req.body.courseCreatorId },
            { $inc: {moneyMade}},
            {upsert: true, 'new': true},
            (err, seller) => {
              res.status(200).json({
                email: seller.email,
                customizedTags: seller.customizedTags,
                name: seller.name,
                userId: seller._id,
                overallScore: seller.overallScore,
                numberOfPerfectScores: seller.numberOfPerfectScores,
                points: seller.points,
                videosWatched: seller.videosWatched,
                courseQuizzesPlayed: seller.courseQuizzesPlayed,
                coursesPayedFor: seller.coursesPayedFor
              });
            });
      });


};
