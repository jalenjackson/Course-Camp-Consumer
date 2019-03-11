const Quiz = require('../../models/quiz');
const Question = require('../../models/questions');

exports.personalityQuizGame = async (req, res) => {
  const personalityQuiz = await Quiz.findById(req.body.quizId);
  const personalityQuizQuestions = await Question.find({ quiz: { $eq: req.body.quizId } });

  let personalityQuizGameData = {
    personalityQuiz,
    personalityQuizQuestions: shuffle(personalityQuizQuestions)
  };

  res.status(200).json({
    personalityQuizGameData
  });
};

function shuffle (a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x
  }
  return a
}