const { allCourseMutations } = require('./course/index');
const { allUserMutations } = require('./user/index');
const { allForumQuestionMutations } = require('./forumQuestion/index');
const { allCourseProgressMutations } = require('./courseProgress/index');

exports.Mutations = `
  type RootMutation {
    ${ allCourseMutations }
    ${ allUserMutations }
    ${ allForumQuestionMutations }
    ${ allCourseProgressMutations }
  }
`;
