exports.forumQuestionMutations = `
  createForumQuestion(forumQuestionInput: ForumQuestionInput): ForumQuestion
  addForumQuestionAnswer(forumQuestionId: String!, answer: String!): ForumQuestion
`;
