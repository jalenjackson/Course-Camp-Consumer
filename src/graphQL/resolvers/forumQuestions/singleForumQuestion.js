const ForumQuestion =  require('../../../models/forumQuestion');
const { TransformObject } = require('./merge');

exports.singleForumQuestion = async args => {
  try {
    const forumQuestion = await ForumQuestion.findById(args.forumQuestionId);
    return TransformObject(forumQuestion);
  } catch (e) { throw e }
};
