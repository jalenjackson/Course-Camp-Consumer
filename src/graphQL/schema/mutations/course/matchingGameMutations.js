exports.matchingGameMutations = `
  addMatchingGameToVideo(courseId: String!, sectionIndex: Float!, videoIndex: Float!, timeAllotted: Float!, question: MatchingGameQuestionInput, answer: MatchingGameAnswerInput): Course
  deleteMatchingGameQuestion(courseId: String!, sectionIndex: Float!, videoIndex: Float!, matchId: String!): Course
  editMatchingGameQuestion(courseId: String!, sectionIndex: Float!, videoIndex: Float!, timeAllotted: Float, matchId: String!, type: String, term: String): Course
`;
