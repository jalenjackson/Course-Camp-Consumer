const User = require('../../models/user');

exports.getTopUsers = (req, res) => {
  User.find()
      .sort('-points')
      .skip(Number(req.query.skip))
      .limit(Number(req.query.limit))
      .exec()
      .then((users) => {
        const response = {
          count: users.length,
          users: users.map((user) => {
            return {
              _id: user._id,
              name: user.name,
              points: user.points
            };
          }),
        };
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
};
