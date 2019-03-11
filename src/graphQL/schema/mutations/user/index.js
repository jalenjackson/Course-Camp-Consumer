const { userMutations } = require('./userMutations');

exports.allUserMutations = `
  ${ userMutations }
`;
