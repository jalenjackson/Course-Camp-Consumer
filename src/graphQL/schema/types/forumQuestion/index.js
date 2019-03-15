const { ForumQuestion } = require('./forumQuestion');
const { ForumQuestionAnswer } = require('./forumQuestionAnswers');
const { ForumQuestionArray } = require('./forumQuestionArray');

exports.allForumQuestionTypes = `
  ${ ForumQuestion }
  ${ ForumQuestionAnswer }
  ${ ForumQuestionArray }
`;
