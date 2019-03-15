const User =  require('../models/user');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://jalenjackson:dumofkH3BtYq9yZv@coursecamp-qxarr.mongodb.net/development?retryWrites=true`,
  { useNewUrlParser: true })
  .then(() => {
    createXPurchasedCourses();
  })
  .catch(err => console.log(err));

const createXPurchasedCourses = async () => {
  try {
    console.log('starting process');
    const user = await User.findById('5c8991fd14421b001190e653');
    let paidCourses = [];
    
    for (let i = 0; i <= 100; i ++ ){
      paidCourses.push('5c89603548de2f0011dbc136');
    }
    
    user.paidCourses = paidCourses;
    user.markModified('paidCourses');
    await user.save();
    console.log('finished process')
  } catch (e) {
    console.log(e);
  }
};