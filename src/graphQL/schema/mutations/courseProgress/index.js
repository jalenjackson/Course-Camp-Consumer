const { courseProgress } = require('./courseProgress');

exports.allCourseProgressMutations = `
  ${ courseProgress }
`;