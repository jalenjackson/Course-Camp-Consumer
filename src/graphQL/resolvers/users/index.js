const { createUser, login } = require('./auth');
const { handleBoughtCourse } = require('./handleBoughtCourse');
const { handlePayout } = require('./handlePayout');
const { getUser } = require('./getUser');
const { uploadProfileImage } = require('./uploadProfileImage');
const { changeUserInfo } = require('./changeUserInfo');
const { forgotPassword } = require('./forgotPassword');
const { findUserByForgotPassword } = require('./findUserByForgotPassword');
const { changePassword } = require('./changePassword');

module.exports = {
  handleBoughtCourse,
  createUser,
  login,
  handlePayout,
  getUser,
  uploadProfileImage,
  changeUserInfo,
  forgotPassword,
  findUserByForgotPassword,
  changePassword
};