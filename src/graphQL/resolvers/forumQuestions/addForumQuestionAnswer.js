const ForumQuestion = require('../../../models/forumQuestion');
const User = require('../../../models/user');
const { TransformObject } = require('./merge');
const { emailTemplate } = require('../../helpers/emailTemplates/answeredQuestion');
const { sendEmail } = require('../../helpers/sendEmail');

exports.addForumQuestionAnswer = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const forumQuestion = await ForumQuestion.findById(args.forumQuestionId);
    const creator = await User.findById(forumQuestion.creator);
    let answers = forumQuestion.answers;
    
    const answer = {
      userId: req.userId,
      answer: args.answer,
      date: new Date().toISOString()
    };
    
    if (!forumQuestion.answers) answers = [];
    
    const userIndex = answers.findIndex(answer => answer.userId === req.userId);
    
    if (userIndex === -1) {
      answers.push(answer)
    } else {
      answers[userIndex] = answer;
    }
  
    forumQuestion.markModified('answers');
    forumQuestion.answers = answers;
    await forumQuestion.save();
  
    sendEmail(creator.email, 'Someone just answered your question!', emailTemplate(creator.name, forumQuestion));
    
    return TransformObject(forumQuestion);
  } catch (e) {
    throw e
  }
};
