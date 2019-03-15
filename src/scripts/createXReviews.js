const Course =  require('../models/course');
const User =  require('../models/user');
const mongoose = require('mongoose');
const loremIpsum = require('lorem-ipsum');

mongoose.connect(`mongodb+srv://jalenjackson:dumofkH3BtYq9yZv@coursecamp-qxarr.mongodb.net/development?retryWrites=true`,
  { useNewUrlParser: true })
  .then(() => {
    createXReviews();
  })
  .catch(err => console.log(err));

const createXReviews = async () => {
  try {
    for (let i = 0; i < 40; i++) {
      console.log('review started');
      
      const course = await Course.findById('5c89603548de2f0011dbc136');
      let reviews = [];
      
      for(let i = 0; i <= 100; i ++) {
        let description = loremIpsum({
          count: 1
          , units: 'sentences'
          , sentenceLowerBound: Math.floor(Math.random() * 15) + 5
          , sentenceUpperBound: Math.floor(Math.random() * 25) + 15
          , paragraphLowerBound: Math.floor(Math.random() * 10) + 3
          , paragraphUpperBound: Math.floor(Math.random() * 10) + 7
          , format: 'plain'
          , random: Math.random
        });
        
        reviews.push({
          userId: "5c8991fd14421b001190e653",
          rating: Math.floor(Math.random() * 5) + 1,
          description
        });
      }
      
      course.reviews = reviews;
      course.markModified('reviews');
      await course.save();
      return console.log('reviews done');
    }
  } catch (e) {
    console.log(e);
  }
};