const Quiz = require('../../models/quiz');
const Question = require('../../models/questions');
const User = require('../../models/user');

exports.quizPage = async (req, res) => {
  const quizQuestionsLength = await Question.find({ quiz: { $eq: req.body.quizId } }).length;
  const quiz = await Quiz.findById(req.body.quizId);
  const user = await User.findById(quiz.userId);

  let quizPageData = {
    quizQuestionsLength,
    quiz,
    user
  };

  res.status(200).json({
    quizPageData
  });
};