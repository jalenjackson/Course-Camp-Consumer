const { allCourseInputs } = require('./inputs/course/index');
const { allForumQuestionInputs } = require('./inputs/forumQuestion/index');

exports.Inputs = `
  ${ allCourseInputs }
  ${ allForumQuestionInputs }
`;
