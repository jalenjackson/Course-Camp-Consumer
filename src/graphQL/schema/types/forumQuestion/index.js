const { ForumQuestion } = require('./forumQuestion');
const { ForumQuestionAnswer } = require('./forumQuestionAnswers');

exports.allForumQuestionTypes = `
  ${ ForumQuestion }
  ${ ForumQuestionAnswer }
`;
