const ForumQuestion = require('../../../models/forumQuestion');
const User = require('../../../models/user');
const { TransformObject } = require('./merge');

exports.addForumQuestionAnswer = async (args, req) => {
  try {
    const forumQuestion = await ForumQuestion.findById(args.forumQuestionId);
    let answers = forumQuestion.answers;
    
    const answer = {
      userId: '5c70f8cedf19c1444c2ecc14',
      answer: args.answer,
      date: new Date().toISOString()
    };
    
    if (!forumQuestion.answers) answers = [];
    
    const userIndex = answers.findIndex(answer => answer.userId === '5c70f8cedf19c1444c2ecc14');
    
    if (userIndex === -1) {
      answers.push(answer)
    } else {
      answers[userIndex] = answer;
    }
  
    forumQuestion.markModified('answers');
    forumQuestion.answers = answers;
    await forumQuestion.save();
    return TransformObject(forumQuestion);
  } catch (e) {
    throw e
  }
};
