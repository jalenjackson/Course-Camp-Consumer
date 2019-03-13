const Course =  require('../../../models/course');
const { TransformObject, MongoFindUser } = require('./merge');

exports.reviewCourse = async (args, req) => {
  try {
    const course = await Course.findById(args.courseId);
    const { rating, description } = args;
    let reviews = course.reviews;
    
    if (!reviews) reviews = [];
    
    const review = {
      userId: MongoFindUser.bind(this, req.userId),
      rating,
      description
    };
    const userReviewIndex = reviews.findIndex(review => review.userId === req.userId);
    
    if (userReviewIndex < 0) {
      reviews.push(review);
    } else {
      reviews[userReviewIndex] = review;
    }
    
    let addReviews = 0;
    
    reviews.map(review => {
      addReviews += review.rating;
    });
    
    course.rating = addReviews / reviews.length;
    course.reviews = reviews;
    
    course.markModified('reviews');
    const result = await course.save();
    return TransformObject(result);
  } catch (e) {
    throw e;
  }
};
