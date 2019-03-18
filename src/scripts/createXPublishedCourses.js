const Course =  require('../models/course');
const User =  require('../models/user');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://jalenjackson:dumofkH3BtYq9yZv@coursecamp-qxarr.mongodb.net/development?retryWrites=true`,
  { useNewUrlParser: true })
  .then(() => {
    createXCourses();
  })
  .catch(err => console.log(err));

const createXCourses = async () => {
  try {
    for (let i = 0; i < 2; i++) {
      console.log('course started');
      const courseObj = {
        title: `coolio ${ i + 1 }`,
        description: `Course description ${ i + 1 }`,
        category: `Course description ${ i + 1 }`,
        color: '#9068be',
        price: 20.99,
        language: 'English',
        learning: 'test,cool,yeah',
        date: new Date().toISOString(),
        status: 'Approved',
        rating: 0,
        creator: '5c8df7c0249d4700117b20df',
        summary: `Course summary ${ i + 1 }`
      };
      
      const course = new Course(courseObj);
      course.publishedCourse = courseObj;
      
      await course.save();
      const user = await User.findById('5c8df7c0249d4700117b20df');
      if(!user) console.log('no user');
      user.createdCourses.push(course);
      await user.save();
      console.log('course created');
    }
  } catch (e) {
    console.log(e);
  }
};