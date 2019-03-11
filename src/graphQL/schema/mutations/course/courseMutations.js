exports.courseMutations = `
  createCourse(courseInput: CourseInput): Course
  updateCourse(courseId: String!, courseInput: CourseInput): Course
  reviewCourse(courseId: String!, rating: Float!, description: String!): Course
`;
