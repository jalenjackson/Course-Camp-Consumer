exports.answerChoiceQuizMutations = `
  addQuizQuestionToVideo(courseId: String!, sectionIndex: Float!, videoIndex: Float!, question: String!, answers: String!, optionalImage: String): Course    
  deleteAddQuizQuestion(courseId: String!, sectionIndex: Float!, videoIndex: Float!, questionIndex: Float!): Course    
  updateQuizQuestion(courseId: String!, sectionIndex: Float!, videoIndex: Float!, term: String!, optionalImage: String, questionIndex: Float!, answerIndex: Float, type: String!): Course
  addAnotherQuizQuestionToQuiz(courseId: String!, sectionIndex: Float!, videoIndex: Float!, questionIndex: Float!, term: String!): Course
`;
