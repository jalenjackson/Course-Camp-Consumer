const mongoose = require('mongoose');
const User = require('../../models/user');

exports.ctaUser = (req, res) => {
  User.findOne({ email: req.body.email })
      .exec()
      .then((result) => {
        if (result) {
          return res.status(201).json({
            email: result.email,
            message: 'User already in system',
          });
        }
        const user = new User({
          _id: mongoose.Types.ObjectId(),
          email: req.body.email,
          customizedTags: 'none',
          overallScore: '0/0',
          numberOfPerfectScores: 0,
          points: 0,
          name: req.body.name,
          password: generatePassword(),
        });
        return user.save()
            .then(() => {
              res.status(201).json({
                email: user.email,
                message: 'User created successfully'
              });
            })
            .catch((err) => {
              res.status(500).json({
                err,
              });
            });
      });
};

function generatePassword () {
  return Math.random().toString(36).slice(-8);
}
