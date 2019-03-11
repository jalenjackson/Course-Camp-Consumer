exports.pictureQuizMutations = `
  addPictureQuizQuestionToVideo(courseId: String!, sectionIndex: Float!, videoIndex: Float!, question: String!, answers: String!): Course    
  deleteAddPictureQuizQuestion(courseId: String!, sectionIndex: Float!, videoIndex: Float!, questionIndex: Float!): Course
  updatePictureQuizQuestion(courseId: String!, sectionIndex: Float!, videoIndex: Float!, term: String!, questionIndex: Float!, answerIndex: Float, type: String!): Course
  addAnotherPictureQuizQuestionToQuiz(courseId: String!, sectionIndex: Float!, videoIndex: Float!, questionIndex: Float!, term: String!): Course
`;
