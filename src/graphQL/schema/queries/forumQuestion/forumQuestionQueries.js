exports.forumQuestionQueries = `
  forumQuestions(limit: Float, skip: Float): ForumQuestionArray
  singleForumQuestion(forumQuestionId: String!): ForumQuestion!
`;
