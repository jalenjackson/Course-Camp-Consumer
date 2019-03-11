const { allCourseQueries } = require('./courses/index');
const { allUserQueries } = require('./users/index');
const { allGlobalQueries } = require('./global/index');
const { allForumQuestionQueries } = require('./forumQuestion/index');

exports.Queries = `
  type RootQuery {
    ${ allCourseQueries }
    ${ allUserQueries }
    ${ allGlobalQueries }
    ${ allForumQuestionQueries }
  }
`;
