const User = require('../../models/user');

exports.updateUserOrganization = (req, res) => {
  User.findOne({ organization: req.body.organization })
      .exec()
      .then((result) => {
        console.log(result)
        if(result) {
          return res.status(409).json({
            message: 'Organization already exists.'
          })
        }

        const data = {
          organization: req.body.organization,
        };

        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $set: data },
            {upsert: true, 'new': true},
            (err, user) => {
              if (err) {
                return res.status(500).json({
                  error,
                });
              }

              console.log(user)

              res.status(201).json({
                email: user.email,
                userId: user._id,
                name: user.name,
                customizedTags: user.customizedTags,
                overallScore: user.overallScore,
                numberOfPerfectScores: user.numberOfPerfectScores,
                points: user.points,
                organization: user.organization
              });
            });
      });
};
