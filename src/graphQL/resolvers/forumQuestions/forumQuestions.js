const ForumQuestion =  require('../../../models/forumQuestion');
const { TransformObject } = require('./merge');

exports.forumQuestions = async () => {
  try {
    const forumQuestions = await ForumQuestion.find();
    return forumQuestions.map(forumQuestion => {
      return TransformObject(forumQuestion)
    });
  } catch (e) { throw e }
};
