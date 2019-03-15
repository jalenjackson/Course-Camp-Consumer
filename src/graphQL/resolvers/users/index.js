const { createUser, login } = require('./auth');
const { handleBoughtCourse } = require('./handleBoughtCourse');
const { handlePayout } = require('./handlePayout');
const { getUser } = require('./getUser');
const { uploadProfileImage } = require('./uploadProfileImage');
const { changeUserInfo } = require('./changeUserInfo');

module.exports = {
  handleBoughtCourse,
  createUser,
  login,
  handlePayout,
  getUser,
  uploadProfileImage,
  changeUserInfo
};