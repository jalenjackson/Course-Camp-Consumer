const ForumQuestion =  require('../../../models/forumQuestion');
const { TransformObject } = require('./merge');

exports.forumQuestions = async (args) => {
  try {
    const forumQuestions = await ForumQuestion.find()
      .skip(args.skip ? args.skip : 0)
      .limit(args.limit ? args.limit : 0);
    
    const forumQuestionLength = await ForumQuestion.count();
    
    const forumQuestionsMapped = forumQuestions.map(forumQuestion => {
      return TransformObject(forumQuestion)
    });
    
    return { forumQuestionLength, forumQuestions: forumQuestionsMapped }
  } catch (e) { throw e }
};
