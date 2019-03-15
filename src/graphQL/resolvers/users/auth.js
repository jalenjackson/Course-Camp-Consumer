const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const { TransformObject } = require('./merge');
const { createUserToken } = require('../global/createToken');

exports.createUser = async args => {
  try {
    const user = await User.findOne({ email: args.userInput.email });
    if (user) { throw new Error('User already exists') }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const createdUser = new User({
      email: args.userInput.email,
      name: args.userInput.name,
      password: hashedPassword,
      isBusinessAccount: false,
      paidCourses: [],
      moneyMade: 0
    });
    const result = await createdUser.save();
    const token = await createUserToken(result);
    return {
      ...result._doc,
      password: null,
      token
    }
  } catch (e) { throw e }
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }
  const doesPasswordMatchCurrentBcryptHash = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatchCurrentBcryptHash) {
    throw new Error('Password is incorrect');
  }
  const token = await createUserToken(user);
  
  return { token, ...TransformObject(user) };
};
