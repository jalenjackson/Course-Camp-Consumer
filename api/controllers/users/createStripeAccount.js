const User = require('../../models/user');
const stripe = require("stripe")("sk_test_AhnNt6x7gUp1h3VLFvHEfbQ5");

exports.createStripeAccount = (req, res) => {
  const _id = req.body.userId;

  User.findById(_id)
      .exec()
      .then((user) => {
        if (user) {
          stripe.accounts.create({
            country: "US",
            email: user.email,
            type: "custom"
          }).then(function(acct) {
            user.stripeAccountId = acct.id;
            user.save();
            res.status(200).json({
              acct
            });
          });
        } else {
          res.status(404).json({
            message: 'No user found!'
          })
        }
      })
};
