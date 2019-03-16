const ForumQuestion = require('../../../models/forumQuestion');
const User = require('../../../models/user');
const { TransformObject } = require('./merge');

exports.createForumQuestion = async (args, req) => {
  try {
    if (!req.isTheUserAuthenticated) {
      throw new Error('Unauthenticated!');
    }
    const forumQuestion = new ForumQuestion({
      course: args.forumQuestionInput.course,
      title: args.forumQuestionInput.title,
      body: args.forumQuestionInput.body,
      sectionIndex: args.forumQuestionInput.sectionIndex,
      videoIndex: args.forumQuestionInput.videoIndex,
      exercise: args.forumQuestionInput.exercise,
      creator: args.forumQuestionInput.creator,
      date: new Date().toISOString()
    });
    let createdForumQuestion;
    const result = await forumQuestion.save();
    createdForumQuestion = TransformObject(result);
    const user = await User.findById(result.creator);
    user.createdForumQuestions.push(forumQuestion);
    await user.save();
    return createdForumQuestion;
  } catch (e) {
    throw e
  }
};
