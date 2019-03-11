const Quiz = require('../../models/quiz');
const Tag = require('../../models/tags');
const User = require('../../models/user');

exports.exploreData = async (req, res) => {

  const featuredQuizzes = await Quiz.find(({ 'personalityResultsLength': { $exists: false } })).sort('-totalPlays').limit(5);
  const personalityQuizzes = await Quiz.find({ 'personalityResultsLength': { $gt: 1 } }).sort('-totalPlays').limit(4);
  const featuredTopTags = await Tag.find(({ count: { $gt: 3 } })).sort({ count: -1 }).limit(8);
  const areThereUserDefinedTags = req.body.userTags;

  const topTags = req.body.userTags
      ? req.body.userTags.split(',')
      : featuredTopTags;

  let topicQuizzes = [];

  for (var i = 0; i < 4; i ++) {
    const quizzes = await Quiz.find(({"tags" : { $regex : new RegExp('^' + (areThereUserDefinedTags ? topTags[i] : topTags[i].name) + '$', 'i') } })).limit(4);
    topicQuizzes.push(quizzes)
  }

  let exploreData = {
    featuredQuizzes,
    personalityQuizzes,
    topTags,
    topicQuizzes,
    featuredTopTags
  };

  res.status(200).json({
    exploreData
  });
};
