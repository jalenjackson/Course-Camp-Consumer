const { allCourseTypes } = require('./types/course/index');
const { allCourseProgressTypes } = require('./types/courseProgress/index');
const { allForumQuestionTypes } = require('./types/forumQuestion/index');

exports.Types = `
  ${ allCourseTypes }
  ${ allCourseProgressTypes }
  ${ allForumQuestionTypes }
`;
